import { useState } from 'react';
import styles from './profile.module.scss'
import { auth } from '../firebase/firebase';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import userPhoto from '../userPhoto.png'

function Profile({ user, login }) {

    const [isActive, setActive] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
                navigate('/sign'); 
            })
            .catch((error) => {
                console.error('Sign out error', error);
            });
    };

    return (
        <>
            <div className={styles.profileBlock} onClick={() => setActive(!isActive)}>
                <div className={styles.avatar}>
                    <img src={userPhoto} />
                </div>

            </div>
            <div className={`${styles.navs} ${isActive ? styles.active : ''}`} onClick={() => setActive(!isActive)}>
                <Link to={`/profile/${auth.currentUser.displayName.toLowerCase()}`}>{login}</Link>
                <Link to={`/profile/${auth.currentUser.displayName.toLowerCase()}`}>Профиль</Link>
                <Link to='/'>Главная</Link>
                <Link to='/basket'>Корзина</Link>
                <Link to='/settings'>Настройки</Link>
                <a onClick={handleLogout}>Выход</a>
            </div>
        </>
    );
}

export default Profile;