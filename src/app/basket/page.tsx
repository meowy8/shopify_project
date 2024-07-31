"use client";
import { ShopifyProduct } from "@/types/shopifyTypes";
import { getProductId } from "@/utils";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket?.value);

  console.log(basket);

  return (
    <div>
      {basket?.map((product: ShopifyProduct) => {
        const id = getProductId(product);

        return <p key={id}>{product.title}</p>;
      })}
    </div>
  );
};

export default Basket;
