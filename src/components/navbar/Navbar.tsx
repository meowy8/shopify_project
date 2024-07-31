import React from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <h1>The Cache</h1>
      </Link>
      <Link href={"/basket"}>Basket</Link>
    </nav>
  );
};

export default Navbar;
