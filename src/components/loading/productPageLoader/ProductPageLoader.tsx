import React from "react";
import styles from "./productPageLoader.module.scss";

const ProductPageLoader = () => {
  return (
    <div className={styles.mainPage}>
      <section className={styles.productDisplay}>
        <div className={styles.imageDisplay}>
          <div className={styles.mainImage}></div>
          <div className={styles.sideContainer}>
            <div className={styles.smallImage}></div>
            <div className={styles.smallImage}></div>
            <div className={styles.smallImage}></div>
            <div className={styles.smallImage}></div>
          </div>
        </div>
        <section className={styles.productDetail}>
          <div className={styles.title}></div>
          <span className={styles.reviews}></span>
          <span className={styles.price}></span>
          <div className={styles.addToCartBtnContainer}>
            <div></div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPageLoader;
