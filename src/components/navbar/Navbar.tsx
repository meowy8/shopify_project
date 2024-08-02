"use client";
import React, { useEffect } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import BasketIcon from "../icons/BasketIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Navbar = () => {
  const [basketAmount, setBasketAmount] = React.useState(0);
  const basket = useSelector((state: RootState) => state.basket.value);

  useEffect(() => {
    const totalItems = basket.length;
    setBasketAmount(totalItems);
  }, [basket]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <Link href={"/"}>
          <h1>The Cache</h1>
        </Link>
        <Link href={"/basket"}>
          <div className={styles.basketContainer}>
            <BasketIcon />
            <span className={styles.basketAmount}>{basketAmount}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
