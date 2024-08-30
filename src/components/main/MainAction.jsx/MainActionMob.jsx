import { useDispatch, useSelector } from 'react-redux';
import styles from './mainactmob.module.scss'
import { useState } from 'react';
import { setCurrentItems, showAllProducts } from '../../../store/products.slice';

function MainActionMob() {
    const [activeCategory, setActiveCategory] = useState('');
    const products = useSelector(state => state);
    const dispatch = useDispatch();

    const categories = [
        {
            name: 'Мужчина',
            key: "men's clothing",
        },
        {
            name: 'Женщина',
            key: "women's clothing",
        },
        {
            name: 'Электроника',
            key: "electronics",
        },
        {
            name: 'Украшения',
            key: "jewelery",
        },
    ];

    function chooseCategory(element) {
        setActiveCategory(element.name);
        dispatch(setCurrentItems(element.key));
    }

    return (
        <div className={styles.mainact}>
            <div className={styles.bigTitle}>Купить товары</div>
            <div className={styles.catalog}>
                <a onClick={() => {
                    dispatch(showAllProducts(true));
                    dispatch(setCurrentItems('all'));
                    setActiveCategory('');
                }}>Каталог</a>
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

export default MainActionMob;