import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setActiveModalBuy, setActiveModalCart, setCurrentItems, showAllProducts } from '../../../store/products.slice';
import styles from './product.module.scss';
import { Link } from 'react-router-dom';

/*zGNc9wYiQhTDeMbrxdF5gYNa*/

function Product() {
    const dispatch = useDispatch();

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
                        <p className={styles.allProduct}>All products</p>
                    ) : (
                        <p className={styles.allProduct}>Product category</p>
                    )}

                    <div className={styles.products}>
                        {products.currentItems.map((product) => (

                            <div className={styles.product} key={product.id}>

                                <Link to={`/product/${product.id}`}>
                                    <div className={styles.title}>{truncateTitle(product.title, 22)}</div>
                                </Link>

                                <img src={product.image} alt={product.title} className={styles.img} />


                                <div className={styles.info}>
                                    <p className={styles.desc}>{truncateTitle(product.description, 20)}</p>
                                    <p className={styles.price}>{product.price} $</p>
                                </div>

                                <div className={styles.buttons}>
                                    <button className={styles.buy} onClick={() => dispatch(setActiveModalBuy({
                                        product,
                                        isActive: true,
                                    }))}>Buy</button>
                                    <button className={styles.cart} onClick={() => dispatch(setActiveModalCart({isActive: true, product: product}))}>Add to cart</button>
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