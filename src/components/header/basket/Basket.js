import { useSelector } from 'react-redux';
import styles from './basket.module.scss'
import { useEffect, useState } from 'react';

function Basket() {
    const [basket, setBasket] = useState([])
    const [counts, setCounts] = useState({})
    const [summa, setSumma] = useState({})
    const [AllProd, setAllProd] = useState({
        summa: 0,
        count: 0,
    })

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('basketProducts')) || [];

        const uniqueProducts = products.reduce((acc, product) => {
            const foundProduct = acc.find(p => p.id === product.id);
            if (foundProduct) {
                foundProduct.quantity += 1;
            } else {
                acc.push({ ...product, quantity: 1 });
            }
            return acc;
        }, []);

        setBasket(uniqueProducts);

        const initialCounts = {};
        const initialSumma = {};

        uniqueProducts.forEach(product => {
            initialCounts[product.id] = product.quantity;
            initialSumma[product.id] = product.price * product.quantity;
        });
        setCounts(initialCounts);
        setSumma(initialSumma);
        calculateTotal(uniqueProducts)

    }, [])


    function increaseCount(id) {
        setCounts((prevCounts) => {
            const newCount = prevCounts[id] + 1;
            setBasket((prevBasket) =>
                prevBasket.map((product) =>
                    product.id === id
                        ? { ...product, quantity: newCount }
                        : product
                )
            );
            const newSumma = {
                ...summa,
                [id]: newCount * basket.find(product => product.id === id).price
            };
            setSumma(newSumma);
            return {
                ...prevCounts,
                [id]: newCount,
            };
        });
    }

    function decreaseCount(id) {
        setCounts((prevCounts) => {
            const newCount = prevCounts[id] > 1 ? prevCounts[id] - 1 : 1;

            setBasket((prevBasket) =>
                prevBasket.map((product) =>
                    product.id === id
                        ? { ...product, quantity: newCount }
                        : product
                )
            );

            const newSumma = {
                ...summa,
                [id]: newCount * basket.find(product => product.id === id).price
            };
            setSumma(newSumma);
            return {
                ...prevCounts,
                [id]: newCount
            };
        });
    }

    useEffect(() => {
        localStorage.setItem('basketProducts', JSON.stringify(basket));

        calculateTotal(basket)

    }, [basket]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    function removeItem(id) {
        const updatedCart = basket.filter(item => item.id !== id);
        setBasket(updatedCart);

        setCounts((prevCounts) => {
            const { [id]: _, ...newCounts } = prevCounts;
            return newCounts;
        });

        setSumma((prevSumma) => {
            const { [id]: _, ...newSumma } = prevSumma;
            return newSumma;
        });
    }

    function calculateTotal(products) {
        let totalSum = 0;
        let totalCount = 0;

        products.forEach(product => {
            totalSum += product.price * product.quantity;
            totalCount += product.quantity;
        });

        setAllProd({
            summa: totalSum.toFixed(2),
            count: totalCount,
        });
    }


    return (
        <div className={styles.basketContainet}>
            <div className={styles.leftPiece}>
                <div className={styles.title}>Ваша корзина товаров</div>


                {
                    basket.map((elem, index) => (
                        <div className={styles.prod} key={index}>

                            <span className={`material-symbols-outlined ${styles.delete}`} onClick={() => removeItem(elem.id)}>
                                close
                            </span>
                            <img src={elem.image} />

                            <div className={styles.info}>
                                <div>{elem.title}</div>
                                <p>{elem.price}$</p>
                            </div>

                            <div className={styles.action}>
                                <span class="material-symbols-outlined" onClick={() => decreaseCount(elem.id)}>
                                    remove
                                </span>

                                <p>{counts[elem.id] || 0}</p>

                                <span class="material-symbols-outlined" onClick={() => increaseCount(elem.id)}>
                                    add
                                </span>

                            </div>

                            <div>
                                <div>Сумма товара:</div>

                                <div>
                                    {summa[elem.id].toFixed(2) || elem.price}$
                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>

            <div className={styles.rightPiece}>
                <div className={styles.sumAllProduct}>Общая сумма товаров</div>

                <div className={styles.xzchto}>
                    <div>В корзине: {AllProd.count} шт</div>
                    <div>Итого с вас: <span>{AllProd.summa}$</span></div>
                </div>

                <div className={styles.delivery}>
                    <div>Доставка</div>
                    <div>Бесплатно</div>
                </div>
                
                <div className={styles.buttonZakaz}>
                    <a>ОФОРМИТЬ ЗАКАЗ</a>
                </div>
            </div>

        </div>
    );
}

export default Basket;