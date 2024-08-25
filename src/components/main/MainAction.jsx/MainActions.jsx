import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentItems, showAllProducts } from '../../../store/products.slice';
import styles from './mainact.module.scss';

function MainActions() {
    const [activeCategory, setActiveCategory] = useState('');
    const products = useSelector(state => state);
    const dispatch = useDispatch();

    const categories = [
        {
            name: 'MEN',
            key: "men's clothing",
        },
        {
            name: 'WOMEN',
            key: "women's clothing",
        },
        {
            name: 'ELECTRONICS',
            key: "electronics",
        },
        {
            name: 'JEWELERY',
            key: "jewelery",
        },
    ];

    function chooseCategory(element) {
        setActiveCategory(element.name);
        dispatch(setCurrentItems(element.key));
    }

    return (
        <div className={styles.mainact}>
            <div className={styles.bigTitle}>Shop All Products</div>
            <div className={styles.catalog}>
                <a onClick={() => {
                    dispatch(showAllProducts(true));
                    dispatch(setCurrentItems('all'));
                    setActiveCategory('');
                }}>CATALOG</a>
            </div>

            <div className={styles.products}>
                {categories.map((el) => (
                    <div 
                        key={el.key} 
                        onClick={() => chooseCategory(el)} 
                        className={`${styles.nav} ${activeCategory === el.name ? styles.active : ''}`}
                    >
                        {el.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainActions;