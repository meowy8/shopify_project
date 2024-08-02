import React from "react";
import styles from "../buttons.module.scss";
import { setBasket } from "@/redux/basketSlice";
import { ShopifyProduct } from "@/types/shopifyTypes";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const AddToCartBtn = ({
  product,
  dispatch,
}: {
  product: ShopifyProduct;
  dispatch: Dispatch;
}) => {
  const [tooltipStyle, setTooltipStyle] = React.useState({});
  const [itemInBasket, setItemInBasket] = React.useState(false);

  const basket = useSelector((state: RootState) => state.basket.value);

  // check redux store for item
  const checkIfItemInBasket = () => {
    const itemInBasket = basket.some(
      (item: ShopifyProduct) => item.id === product.id
    );

    setItemInBasket(itemInBasket);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(dispatch(setBasket(product)));
    dispatch(setBasket(product));
    triggerTooltip();
  };

  // trigger the tooltip to appear
  const triggerTooltip = () => {
    checkIfItemInBasket();
    const changedStyle = { translate: " 0 -150%", opacity: 1 };

    setTooltipStyle(changedStyle);

    // tooltip appears on screen for 3 seconds
    return setTimeout(() => {
      return setTooltipStyle({});
    }, 3000);
  };

  return (
    <button onClick={handleClick} className={styles.addToCartBtn} type="button">
      <span className={styles.tooltip} style={tooltipStyle}>
        {itemInBasket ? "Already added" : "Added!"}
      </span>
      Add to Basket
    </button>
  );
};

export default AddToCartBtn;
