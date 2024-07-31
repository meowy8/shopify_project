import { NextResponse } from "next/server";

async function shopifyFetch({
  query,
  variables,
}: {
  query: string;
  variables?: Object;
}) {
  const endpoint = process.env.SHOPIFY_GRAPHQL_ENDPOINT;
  const key = process.env.SHOPIFY_API_ACCESS_TOKEN;

  if (!endpoint || !key) {
    console.error("Missing Shopify API credentials");
    throw new Error("Missing Shopify API credentials");
  }

  // console.log("Endpoint:", endpoint);
  // console.log("Query:", query);

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      const error = await result.json();
      throw new Error(JSON.stringify(error));
    }

    return await result.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllProducts() {
  const query = `
    {
      products(sortKey: TITLE, first: 10) {
        edges {
          node {
            id
            title
            description
            handle
            featuredImage {
              altText
              height
              width
              url
            }
          }
        }
      }
    }
  `;

  return shopifyFetch({ query });
}

// fetch all products
export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
