import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { fetchProducts, setActiveModalCart } from "../../../store/products.slice";
import styles from './productDetail.module.scss'

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);
    const product = products.find(p => p.id === parseInt(id));

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
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                    </div>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.actionBtns}>

                        <div className={styles.cartbtn}>
                            <a onClick={() => dispatch(setActiveModalCart({ isActive: true, product: product }))}>ADD TO CART</a>
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
}

export default ProductDetail;