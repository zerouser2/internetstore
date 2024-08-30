import React, { Suspense, useEffect, useState } from 'react';
import { Await, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import Profile from './Profile';
import { auth } from '../firebase/firebase';

function Header() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <div className={styles.header}>
                <p className={styles.bigText}>StyleSphere</p>

                {/* <div className={styles.navigations}>
                    <a>MEN</a>
                    <a>WOMEN</a>
                    <a>ELECTRONICS</a>
                    <a>JEWELERY</a>
                </div> */}

                <div className={styles.userBlock}>
                    <div className={styles.actions}>
                        <Suspense fallback={<div>Loading...</div>}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                user ? <Profile user={user} login={user.displayName} /> : <Link to='/sign'>Sign Up/ Sign In</Link>
                            )}
                        </Suspense>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Header;