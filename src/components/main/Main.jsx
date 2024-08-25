import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/products.slice';
import styles from './main.module.scss';
import Product from './products/Products';
import MainActions from './MainAction.jsx/MainActions';
import ModalCart from './Modal/ModalCart';
import ModalBuy from './Modal/ModalBuy';

function Main() {
    
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <MainActions />

                <Product />

            </div>
            <ModalCart />
            <ModalBuy />
        </div>
    );
}

export default Main;