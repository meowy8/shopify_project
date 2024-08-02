"use client";
import { RootState } from "@/app/store";
import ImageDisplay from "@/components/productPage/imageDisplay/ImageDisplay";
import { ListOfProducts, ShopifyProduct } from "@/types/shopifyTypes";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./productPage.module.scss";
import AddToCartBtn from "@/components/buttons/addtocart/AddToCartBtn";
import ProductPageLoader from "@/components/loading/productPageLoader/ProductPageLoader";
import { Span } from "next/dist/trace";
import ProductCard from "@/components/productCard/ProductCard";
import RelatedProducts from "@/components/productPage/relatedProducts/RelatedProducts";
import ProductDescription from "@/components/productPage/productDescription/ProductDescription";
import ProductDetail from "@/components/productPage/productDetail/ProductDetail";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const productFromStore = useSelector((state: RootState) => {
    const products = state.products.value as ListOfProducts | null;
    return products
      ? products.find((product) => product.id === `gid://shopify/Product/${id}`)
      : null;
  });

  const [product, setProduct] = useState(productFromStore);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch("/api/shopify/product?id=" + id);
      const result = await response.json();

      setProduct(result.data.product);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (!product) {
    fetchProduct();

    return <ProductPageLoader />;
  }

  return (
    <div className={styles.mainPage}>
      <section className={styles.productDisplay}>
        <div>
          <ImageDisplay product={product} />
          <ProductDescription product={product} />
        </div>
        <div className={styles.rightSide}>
          <ProductDetail product={product} dispatch={dispatch} />
          <RelatedProducts product={product} />
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
