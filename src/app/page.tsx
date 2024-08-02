"use client";
import { getProducts } from "@/redux/productsSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/productCard/ProductCard";
import styles from "./page.module.scss";
import { ShopifyProduct, ListOfProducts } from "@/types/shopifyTypes";
import { RootState } from "./store";
import { getProductId } from "../utils";
import HomePageHeader from "@/components/homePage/header/HomePageHeader";

type GQLEdge = { node: ShopifyProduct };

export default function Home() {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    opacity: 0,
    transform: "translateY(20px)",
  });

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("element in view");
          setIsVisible({ opacity: 1, transform: "translateY(0)" });
          observer.unobserve(entry.target); // Unobserve after it appears to avoid re-triggering
        }
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <main className={styles.homePage}>
      <HomePageHeader />
      <section
        className={styles.productList}
        style={isVisible}
        ref={targetRef}
        id="productList"
      >
        {products &&
          products.map((product: ShopifyProduct, index: number) => {
            const id = getProductId(product);

            return <ProductCard key={id} product={product} id={id} />;
          })}
      </section>
    </main>
  );
}
