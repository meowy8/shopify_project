"use client";
import { RootState } from "@/app/store";
import { ListOfProducts, ShopifyProduct } from "@/types/shopifyTypes";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductPage = () => {
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
      console.log("result", result);

      setProduct(result.data.product);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (!product) {
    fetchProduct();
  }

  return (
    <div>
      <p>{product?.title}</p>
    </div>
  );
};

export default ProductPage;
