import { useEffect, useState } from 'react';
import styles from './modalbuy.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveModalBuy } from '../../../store/products.slice';

function ModalBuy() {
    const { isActiveModalBuy, currentProduct, basket } = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
        if (basket.length) {
            let existingBasket = JSON.parse(localStorage.getItem('basketProducts')) || [];
    
            existingBasket = [...existingBasket, ...basket];
    
            existingBasket = [...new Set(existingBasket.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

            localStorage.setItem('basketProducts', JSON.stringify(existingBasket));
        }
    }, [basket])

    useEffect(() => {
        if (isActiveModalBuy) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''
        }
    }, [isActiveModalBuy]);

    return (
        <div className={`${styles.modalContainer} ${isActiveModalBuy ? styles.active : ''}`}>
            <div className={styles.modal}>
                <div className={styles.cancelBlock}>
                    <span class="material-symbols-outlined" onClick={() => dispatch(setActiveModalBuy(false))}>
                        close
                    </span>
                </div>

                <div className={styles.content}>
                    <div className={styles.info}>
                        {
                            isActiveModalBuy ? currentProduct.map((el) => {
                                return (
                                    <div className={styles.imgandtext}>
                                        <img src={el.product.image} className={styles.img} />
                                        <div>
                                            <p className={styles.title}>{el.product.title}</p>
                                            <p className={styles.desc}>{el.product.description}</p>

                                        </div>
                                    </div>
                                )
                            }) : ''
                        }
                        {
                            isActiveModalBuy ? currentProduct.map((el) => {
                                return (
                                    <div className={styles.costBlock}>
                                        <p className={styles.price}>{el.product.price} $</p>

                                        <p className={styles.priceForOne}>Price for 1 item</p>

                                        <div className={styles.dostavka}>
                                            <p>
                                                Delivery August 17</p>
                                            <p style={{ color: '#00ad30' }}>Free</p>
                                        </div>

                                        <span className={styles.line}></span>

                                        <p className={styles.returnMoney}>We will refund your money if your order is not received 60 days after shipping.</p>
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
                    <div className={styles.nextPageBtn}>
                        <a onClick={() => dispatch(setActiveModalBuy(false))} className={styles.navig}>Go to purchase page</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ModalBuy;