import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setActiveModalBuy, setActiveModalCart, setCurrentItems, showAllProducts } from '../../../store/products.slice';
import styles from './product.module.scss';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

/*zGNc9wYiQhTDeMbrxdF5gYNa*/

function Product() {
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery({ minWidth: 992 });
    const { products, status, error, currentItems } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    function truncateTitle(title, maxLength) {
        if (title.length <= maxLength) {
            return title;
        }

        let truncated = title.slice(0, maxLength);

        if (title[maxLength] === ' ') {
            return truncated.trim() + '...';
        }

        let lastSpaceIndex = truncated.lastIndexOf(' ');

        return lastSpaceIndex === -1
            ? truncated.trim() + '...'
            : truncated.slice(0, lastSpaceIndex).trim() + '...';
    }


    return (
        <div className={styles.productBlock}>
            {products.status === 'loading' && <h2>Loading...</h2>}
            {error && <p>Error: {products.error.message}</p>}

            

            {products.status === 'succeeded' && (
                <>
                    {products.currentItems.length === products.products.length ? (
                        <p className={styles.allProduct}>Все продукты</p>
                    ) : (
                        <p className={styles.allProduct}>Категория продукта</p>
                    )}

                    <div className={styles.products}>
                        {products.currentItems.map((product) => (

                            <div className={styles.product} key={product.id}>

                                <Link to={`/product/${product.id}`} className={styles.linkTitle}>
                                    <div className={styles.title}>{truncateTitle(product.title, 22)}</div>
                                </Link>

                                <img src={product.image} alt={product.title} className={styles.img} />


                                <div className={styles.info}>
                                    <p className={styles.desc}>{truncateTitle(product.description, 20)}</p>
                                    <p className={styles.price}>{product.price} $</p>
                                </div>

                                <div className={styles.buttons}>
                                    <a className={styles.buy} onClick={() => dispatch(setActiveModalBuy({
                                        product,
                                        isActive: true,
                                    }))}>Купить</a>
                                    <a className={styles.cart} onClick={() => dispatch(setActiveModalCart({ isActive: true, product: product }))}>В корзину</a>
                                </div>

                            </div>
                        ))}
                    </div>

                </>
            )}

        </div>
    );
}

export default Product;