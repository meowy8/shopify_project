import { ShopifyProduct } from "@/types/shopifyTypes";
import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "@/redux/basketSlice";
import styles from "./buttons.module.scss";

const RemoveFromBasketBtn = ({ product }: { product: ShopifyProduct }) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const id = product.id;
    dispatch(removeItem(id));
  };
  return (
    <button
      className={styles.removeFromBasketBtn}
      onClick={(e) => removeItemFromBasket(e)}
    >
      Remove
    </button>
  );
};

export default RemoveFromBasketBtn;
