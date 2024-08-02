"use client";
import { ShopifyProduct } from "@/types/shopifyTypes";
import { getProductId } from "@/utils";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BasketItem from "@/components/basketItem/BasketItem";
import styles from "./basket.module.scss";
import Link from "next/link";

const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket.value);
  const [basketTotal, setBasketTotal] = React.useState("0.00");

  const calculateBasketTotal = useCallback(() => {
    const totalLong = basket.reduce(
      (total, item: ShopifyProduct) =>
        total + Number(item.priceRangeV2.minVariantPrice.amount),
      0
    );
    return totalLong.toFixed(2);
  }, [basket]);

  useEffect(() => {
    setBasketTotal(calculateBasketTotal());
  }, [calculateBasketTotal]);

  useEffect(() => console.log(basketTotal), [basketTotal]);

  return (
    <div className={styles.mainPage}>
      <section className={styles.basketDisplay}>
        {basketTotal !== "0.00" ? (
          <div className={styles.basketList}>
            {basket.map((product: ShopifyProduct) => {
              const id = getProductId(product);

              return <BasketItem key={id} product={product} id={id} />;
            })}
          </div>
        ) : (
          <p>No items added to basket</p>
        )}
        <div className={styles.basketDetails}>
          <h1>Basket</h1>
          <span>
            {basket.length} {basket.length > 1 ? "items" : "item"}
          </span>
          <div className={styles.totalContainer}>
            <span>Total</span>
            <span className={styles.total}>£{basketTotal}</span>
          </div>
          <div className={styles.checkoutBtnContainer}>
            <Link href="/checkout">
              <button
                className={styles.checkoutBtn}
                disabled={basket.length === 0}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Basket;
