import React, { useEffect } from "react";
import styles from "./productCard.module.scss";
import { ShopifyProduct } from "../../types/shopifyTypes";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "../../redux/basketSlice";
import { RootState } from "@/app/store";
import AddToCartBtn from "../buttons/addtocart/AddToCartBtn";

const ProductCard = ({
  product,
  id,
}: {
  product: ShopifyProduct;
  id: string;
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.productCard}>
      <Link href={"/product/" + id}>
        <div className={styles.overlay}>
          <p>{product.title}</p>
        </div>
        <div className={styles.productImage}>
          <Image
            width="200"
            height="300"
            alt={product.featuredImage.altText}
            src={product.featuredImage.url}
          />
        </div>
        <div className={styles.productDescription}>
          <AddToCartBtn dispatch={dispatch} product={product} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
