import { useSelector } from 'react-redux';
import styles from './basket.module.scss'
import { useEffect, useState } from 'react';

function Basket() {
    const [basket, setBasket] = useState([])

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('basketProducts'))

        setBasket([...basket, ...products])

    }, [])

    return (
        <div className={styles.basketContainet}>
            <div className={styles.title}>Ваша корзина товаров</div>


            {
                basket.map((elem, index) => (
                    <div className={styles.prod}>
                        <span class="material-symbols-outlined">
                            close
                        </span>
                        <img src={elem.image} />
                        <div className={styles.info}>
                            <div>{elem.title}</div>
                            <p>{elem.price}$</p>
                        </div>
                    </div>

                ))
            }

        </div>
    );
}

export default Basket;