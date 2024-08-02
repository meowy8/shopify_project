import { ShopifyProduct } from "@/types/shopifyTypes";
import React from "react";
import styles from "./productDescription.module.scss";

const ProductDescription = ({ product }: { product: ShopifyProduct }) => {
  return (
    <article className={styles.productDescription}>
      <h3>More Info</h3>
      <p>
        {product.description ? (
          product.description
        ) : (
          <span>There is no description for this product</span>
        )}
      </p>
    </article>
  );
};

export default ProductDescription;
