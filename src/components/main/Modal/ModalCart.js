import { useEffect, useState } from 'react';
import styles from './modal.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveModalCart } from '../../../store/products.slice';

function ModalCart() {
    const isActiveModal = useSelector(state => state.products.isActiveModalCart)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isActiveModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''
        }
    }, [isActiveModal]);

    return (
        <div className={`${styles.modalContainer} ${isActiveModal ? styles.active : ''}`}>
            <div className={styles.modal}>
                <p>Ваш товар добавлен в корзину!</p>

                <a onClick={() => dispatch(setActiveModalCart(false))}>OK</a>
            </div>
        </div>
    );
}

export default ModalCart;