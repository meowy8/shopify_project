"use client";
import React, { useCallback, useEffect } from "react";
import styles from "./checkout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ShopifyProduct } from "@/types/shopifyTypes";
import SmallImage from "@/components/productPage/imageDisplay/SmallImage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [firstThreeItems, setFirstThreeItems] = React.useState([]);
  const [itemsRemaining, setItemsRemaining] = React.useState(0);
  const [basketTotal, setBasketTotal] = React.useState("0.00");
  const basket = useSelector((state: RootState) => state.basket.value);

  const router = useRouter();

  if (basket.length === 0) return router.push("/");

  useEffect(() => {
    const items = basket.filter((item, index) => index < 3);
    let remaining = 0;
    if (basket.length > 3) remaining = basket.length - 2;

    setFirstThreeItems(items);
    setItemsRemaining(remaining);
  }, []);

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

  return (
    <section className={styles.mainPage}>
      <Link href={"/basket"}>{"<-"} Back to Basket</Link>
      <div className={styles.content}>
        <div className={styles.sideContent}>
          <div className={styles.shippingInformation}>
            <h3>Shipping</h3>
            <p>123 Main Street, United Kingdom, 789 ABC</p>
          </div>
          <div className={styles.basketList}>
            {firstThreeItems.map((product: ShopifyProduct, index) => {
              return (
                <div key={product.id} className={styles.basketItem}>
                  {itemsRemaining && index === firstThreeItems.length - 1 && (
                    <div className={styles.itemOverlay}>
                      <p>+ {itemsRemaining}</p>
                    </div>
                  )}
                  <Image
                    src={product.featuredImage.url}
                    width={product.featuredImage.width}
                    height={product.featuredImage.height}
                    alt={product.featuredImage.altText}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.checkoutDetails}>
          <h1>Checkout</h1>
          <span>{basket.length} items</span>
          <ul className={styles.address}>
            <li>123 Main Street</li>
            <li>United Kingdom</li>
            <li>789 ABC</li>
          </ul>
          <div className={styles.paymentMethod}>
            <p>PayPal</p>
          </div>
          <div className={styles.checkoutTotal}>
            <p>£{basketTotal}</p>
          </div>
          <div className={styles.purchaseBtn}>
            <Link href="/paymentSuccess">
              <span>Purchase</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
