"use client";
import { getProducts } from "@/redux/productsSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/productCard/ProductCard";
import styles from "./page.module.scss";
import { ShopifyProduct, ListOfProducts } from "@/types/shopifyTypes";
import { RootState } from "./store";
import { getProductId } from "../utils";

type GQLEdge = { node: ShopifyProduct };

export default function Home() {
  const products: ListOfProducts =
    useSelector((state: RootState) => state.products.value) || [];
  const dispatch = useDispatch();

  // fetch items from api
  const fetchItems = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch("/api/shopify/products");
      const result = await response.json();

      const items: ListOfProducts = result.data.products.edges.map(
        (edge: GQLEdge) => edge.node
      );

      // set product list
      dispatch(getProducts(items));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // fetch items on first render
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <main className={styles.homePage}>
      {products &&
        products.map((product: ShopifyProduct, index: number) => {
          const id = getProductId(product);

          return <ProductCard key={id} product={product} id={id} />;
        })}
    </main>
  );
}
