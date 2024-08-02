import AddToCartBtn from "@/components/buttons/addtocart/AddToCartBtn";
import { ShopifyProduct } from "@/types/shopifyTypes";
import React from "react";
import styles from "./productDetail.module.scss";
import { Dispatch } from "@reduxjs/toolkit";

const ProductDetail = ({
  product,
  dispatch,
}: {
  product: ShopifyProduct;
  dispatch: Dispatch;
}) => {
  return (
    <section className={styles.productDetail}>
      <h1 className={styles.title}>{product.title}</h1>
      {/* <span className={styles.reviews}>$REVIEWS</span> */}
      <span className={styles.price}>
        £{product.priceRangeV2.minVariantPrice.amount}
      </span>
      <div className={styles.addToCartBtnContainer}>
        <AddToCartBtn dispatch={dispatch} product={product} />
      </div>
    </section>
  );
};

export default ProductDetail;
