import { ShopifyProduct } from "@/types/shopifyTypes";
import React from "react";
import styles from "./basketItem.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeItem } from "@/redux/basketSlice";
import RemoveFromBasketBtn from "../buttons/RemoveFromBasketBtn";

const BasketItem = ({
  product,
  id,
}: {
  product: ShopifyProduct;
  id: string;
}) => {
  return (
    <Link href={`/product/${id}`}>
      <div className={styles.basketItem}>
        <div className={styles.itemImage}>
          <Image
            src={product.featuredImage.url}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            alt={product.featuredImage.altText}
          />
        </div>
        <div className={styles.itemDetail}>
          <div>
            <p>{product.title}</p>
            <span>£{product.priceRangeV2.minVariantPrice.amount}</span>
          </div>
          <RemoveFromBasketBtn product={product} />
        </div>
      </div>
    </Link>
  );
};

export default BasketItem;
