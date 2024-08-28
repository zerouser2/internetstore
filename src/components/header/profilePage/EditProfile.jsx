import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import styles from './editprof.module.scss'
import { sendEmailVerification, updateEmail, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';

function EditProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState({
        login: '',
        email: '',
        description: '',
    })
    const [description, setDescription] = useState('')


    useEffect(() => {

        const savedDescription = localStorage.getItem('description');
        if (savedDescription) {
            setDescription(savedDescription);
            
            setDatas((prevDatas) => ({
                ...prevDatas,
                description: savedDescription
            }));
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setDatas({
                    ...datas,
                    login: user.displayName,
                    email: user.email,
                })

            }
            setLoading(false);
            console.log(user)
        });



        return () => unsubscribe();
    }, []);

    useEffect(() => {

        localStorage.setItem('description', description);

    }, [description]);

    function saveSettings() {
        setDescription(datas.description)

        user.reload().then(() => {
            if (datas.login !== user.displayName) {
                updateProfile(user, { displayName: datas.login })
                    .then(() => {
                        console.log('Логин успешно обновлен');
                    })
                    .catch((error) => {
                        console.error('Ошибка при обновлении логина:', error);
                    });
            }

            if (datas.email !== user.email) {
                if (user.emailVerified) {
                    // Обновляем email
                    updateEmail(user, datas.email)
                        .then(() => {
                            console.log('Email успешно обновлен');
                            // Письмо для подтверждения отправляется автоматически Firebase после обновления email
                            alert('Ваш email был успешно обновлен. Пожалуйста, подтвердите его через письмо, отправленное на новый email.');
                        })
                        .catch((error) => {
                            console.error('Ошибка при обновлении email:', error);
                            if (error.code === 'auth/too-many-requests') {
                                alert('Слишком много запросов. Пожалуйста, подождите немного перед повторной попыткой.');
                            }
                        });
                } else {
                    alert('Сначала подтвердите свой текущий Email адрес в своем профиле.');
                }
            }
        }).catch((error) => {
            console.error('Ошибка при перезагрузке данных пользователя:', error);
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.title}>Настройки</div>

            <div className={styles.container}>
                <div>
                    <p>Логин</p>
                    <input value={datas.login} onChange={(e) => setDatas({ ...datas, login: e.target.value })} />
                </div>

                <div>
                    <p>Email</p>
                    <input value={datas.email} onChange={(e) => setDatas({ ...datas, email: e.target.value })} />
                </div>

                <div>
                    <p>Информация о вас</p>
                    <textarea value={datas.description} onChange={(e) => setDatas({ ...datas, description: e.target.value })}></textarea>

                </div>

                <div>
                    <a onClick={saveSettings}>Сохранить изменения</a>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;