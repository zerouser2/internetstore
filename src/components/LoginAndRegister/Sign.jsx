import { useState } from 'react';
import styles from './sign.module.scss'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLogAuthDatas, setRegAuthDatas } from '../../store/auth.slice';

function Sign() {
    const [regDatas, setRegDatas] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [logDatas, setLogDatas] = useState({
        email: '',
        password: '',
    })

    const [regError, setRegError] = useState('')
    const [logError, setLogError] = useState('')

    const [activeTab, setActiveTab] = useState('SignIn');

    const dispatch = useDispatch()

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const authReg = (name, value) => {
        setRegDatas({ ...regDatas, [name]: value });
    };

    const authLog = (name, value) => {
        setLogDatas({ ...logDatas, [name]: value });
    };

    function register(e) {
        e.preventDefault();

        if (regDatas.password !== regDatas.confirmPassword) {
            setRegError('Passwords did not match');
            return;
        }

        createUserWithEmailAndPassword(auth, regDatas.email, regDatas.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                const login = prompt('Придумайте логин:');
                if (login) {
                    updateProfile(user, { displayName: login })
                        .then(() => {
                            console.log('Профиль обновлен');
                            dispatch(setRegAuthDatas(regDatas));
                            setRegDatas({
                                email: '',
                                password: '',
                                confirmPassword: '',
                            });
                            setRegError('');
                            navigate('/');
                        })
                        .catch((error) => {
                            console.error('Ошибка обновления профиля:', error);
                            setRegError('Ошибка обновления профиля');
                        });
                }
            })
            .catch((regError) => {
                console.log(regError);
                setRegError(regError.message);
            });
    }

    function login(e) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, logDatas.email, logDatas.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                if (!user.displayName) {
                    const login = prompt('Придумайте логин:');
                    if (login) {
                        updateProfile(user, { displayName: login })
                            .then(() => {
                                console.log('Профиль обновлен');
                                dispatch(setLogAuthDatas(logDatas));
                                setLogDatas({
                                    email: '',
                                    password: '',
                                });
                                setLogError('');
                                navigate('/');
                            })
                            .catch((error) => {
                                console.error('Ошибка обновления профиля:', error);
                                setLogError('Ошибка обновления профиля');
                            });
                    }
                } else {
                    dispatch(setLogAuthDatas(logDatas));
                    setLogDatas({
                        email: '',
                        password: '',
                    });
                    setLogError('');
                    navigate('/');
                }
            })
            .catch((logError) => {
                console.log(logError);
                setLogError('Could not find your account!');
            });
    }

    const navigate = useNavigate()

    return (
        <div className={styles.container}>

            <span className={`material-symbols-outlined ${styles.back}`} onClick={() => navigate(-1)}>
                arrow_back_ios
            </span>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tablink} ${activeTab === 'SignIn' ? styles.active : ''}`}
                    onClick={() => handleTabClick('SignIn')}
                >
                    SIGN IN
                </button>
                <button
                    className={`${styles.tablink} ${activeTab === 'SignUp' ? styles.active : ''}`}
                    onClick={() => handleTabClick('SignUp')}
                >
                    SIGN UP
                </button>
            </div>

            {activeTab === 'SignUp' && (
                <div id="SignIn" className={styles.tabcontent}>

                    <form onSubmit={register}>
                        <div className={styles.labels}>
                            <label htmlFor="signin-username">Email</label>
                            <input type="email" id="signin-email" name="email" value={regDatas.email} onChange={(e) => authReg('email', e.target.value)} />
                        </div>

                        <div className={styles.labels}>
                            <label htmlFor="signin-password">Password</label>
                            <input type="password" id="signin-password" name="password" value={regDatas.password} onChange={(e) => authReg('password', e.target.value)} />

                        </div>

                        <div className={styles.labels}>
                            <label htmlFor="signin-password">Confirm Password</label>
                            <input type="password" id="signin-password" name="confirm_password" value={regDatas.confirmPassword} onChange={(e) => authReg('confirmPassword', e.target.value)} />

                        </div>

                        <button type="submit" className={styles.signBtn}>Sign In</button>

                    </form>


                    {regError ? <p style={{ color: 'red' }}>{regError}</p> : ''}

                </div>
            )}

            {activeTab === 'SignIn' && (
                <div id="SignUp" className={styles.tabcontent}>

                    <form onSubmit={login}>
                        <label htmlFor="signup-email">Email</label>
                        <input type="email" id="signup-email" name="email" value={logDatas.email} onChange={(e) => authLog('email', e.target.value)} />

                        <label htmlFor="signup-password">Password</label>
                        <input type="password" id="signup-password" name="password" value={logDatas.password} onChange={(e) => authLog('password', e.target.value)} />

                        <button type="submit" className={styles.signBtn}>Sign Up</button>
                    </form>
                    <div className={styles.line}></div>


                    <div className={styles.forgot}>
                        <a>Forgot your password?</a>
                    </div>
                    {logError ? <p style={{ color: 'red', marginTop: '10px' }}>{logError}</p> : ''}
                </div>
            )}
        </div>
    );
}

export default Sign;