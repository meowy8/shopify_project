import React from "react";
import styles from "../buttons.module.scss";

const AddToCartBtn = ({
  handleClick,
}: {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button onClick={handleClick} className={styles.addToCartBtn} type="button">
      Add to Basket
    </button>
  );
};

export default AddToCartBtn;
