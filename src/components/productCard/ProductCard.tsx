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
  const basket = useSelector((state: RootState) => state.basket.value);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(dispatch(setBasket(product)));
    dispatch(setBasket(product));
  };

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
          <AddToCartBtn handleClick={handleClick} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
