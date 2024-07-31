"use client";
import store from "@/app/store";
import React from "react";
import { Provider } from "react-redux";

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProductsProvider;
