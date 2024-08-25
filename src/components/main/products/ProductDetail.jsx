import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { fetchProducts } from "../../../store/products.slice";
import styles from './productDetail.module.scss'

function ProductDetail() {
    const [count, setCount] = useState(1)

    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);
    const product = products.find(p => p.id === parseInt(id));

    const [summa, setSumma] = useState(0)

    useEffect(() => {
        if (product) {
            setSumma(product.price);
        }
    }, [product]);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    if (!product) return <p>Product not found</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <>
            <div className={styles.containerProduct}>
                <img src={product.image} alt={product.title} className={styles.image} />
                <div className={styles.infoAboutProduct}>
                    <div className={styles.priceAndTitle}>
                        <h1>{product.title}</h1>
                        <p>${product.price}</p>
                    </div>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.actionBtns}>
                        <div className={styles.counter}>
                            <span className={`material-symbols-outlined ${styles.remove}`} onClick={() => {
                                if (count !== 1) {
                                    setCount((prevCount) => {
                                        if (prevCount > 1) {
                                            const newCount = prevCount - 1;
                                            setSumma(product.price * newCount);
                                            return newCount;
                                        }
                                        return prevCount; // Если count равен 1, просто вернём текущее значение
                                    });
                                }
                            }}>
                                remove
                            </span>

                            <p>{count}</p>

                            <span className={`material-symbols-outlined ${styles.add}`} onClick={() => {
                                    setCount((prevCount) => {
                                        const newCount = prevCount + 1;
                                        setSumma((product.price * newCount).toFixed(2));
                                        return newCount;
                                    });
                                }}>
                                add
                            </span>
                        </div>

                        <div className={styles.cartbtn}>
                            <a>ADD TO CART</a>
                        </div>

                    </div>
                    <div className={styles.showSum}>
                        <p>Сумма: ${summa} </p>
                    </div>
                </div>

            </div>

        </>
    );
}

export default ProductDetail;