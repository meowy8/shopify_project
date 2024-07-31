export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage: {
    altText: string;
    width: number;
    height: number;
    url: string;
  };
}

export type ListOfProducts = ShopifyProduct[];
