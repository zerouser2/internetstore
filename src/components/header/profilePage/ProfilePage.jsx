import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import styles from './profpage.module.scss';
import userPhoto from '../../userPhoto.png'
import { Link } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';

function ProfilePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createTime, setCreateTime] = useState({
        day: '',
        month: '',
        year: ''
    })
    
    const [isVerify, setVerify] = useState(false)

    const [activeContent, setActiveContent] = useState('content1')
    const [desc, setDesc] = useState('')


    useEffect(() => {
        const savedDescription = localStorage.getItem('description');
        if (savedDescription) {
            setDesc(savedDescription);
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);

                const str = user.metadata.creationTime;
                const sliced = str.slice(5);
                const [day, monthStr, year] = sliced.split(" ");

                const monthMap = {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04',
                    May: '05', Jun: '06', Jul: '07', Aug: '08',
                    Sep: '09', Oct: '10', Nov: '11', Dec: '12'
                };

                const month = monthMap[monthStr] || '';
                setCreateTime({ day, month, year });

            }

            if (user.emailVerified) {
                setVerify(true)
            }
            setLoading(false);

        });

        return () => unsubscribe();
    }, []);

    function verifyEmail() {
        if (!currentUser.emailVerified) {
            sendEmailVerification(currentUser)
                .then(() => {
                    console.log('Письмо для подтверждения отправлено на текущий email');
                })
                .catch((error) => {
                    console.error('Ошибка при отправке письма для подтверждения:', error);
                });
        } else {
            console.log('DA')
        }
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.profileBlock}>
            <div className={styles.leftPiece}>
                <div className={styles.title}>
                    Пользователь сайта
                </div>
                <div className={styles.blackFon}>
                    <img src={userPhoto} />
                </div>
                <div className={styles.info}>
                    <div className={styles.login}>{currentUser?.displayName || 'User'}</div>
                    <div>
                        <div className={styles.balance}>Баланс: 0$</div>
                        <div>Email: {auth.currentUser.email} </div>
                        <div>Аккаунт был создан: {`${createTime.day}.${createTime.month}.${createTime.year}`}</div>
                        <div className={styles.emailVerify}>
                            {isVerify ? <p>Email подтвержден</p> : <a onClick={verifyEmail}>Подтвердить email</a>}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightPiece}>
                <div className={styles.navs}>

                    <div className={`${styles.navBtn} ${activeContent === 'content1' ? styles.active : ''}`}>
                        Информация о профиле
                    </div>


                </div>

                <div className={styles.contentContainer}>

                    <div className={`${styles.content} ${activeContent === 'content1' ? styles.active : ''}`} id="content1">

                        <div>
                            <div className={styles.name}>{auth.currentUser.displayName}</div>
                            <div className={styles.desc}>Описание профиля: </div>
                            <br></br>
                            <div>
                                {desc ? desc : 'У вас нет описания'}
                            </div>

                        </div>

                        <div className={styles.settingBlock}>
                            <Link to={`/settings`} className={styles.settings}>Настройки профиля</Link>
                        </div>
                    </div>



                </div>


            </div>
        </div>
    );
}

export default ProfilePage;