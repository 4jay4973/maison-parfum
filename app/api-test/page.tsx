import { getProducts } from "@/lib/api/products";

export default async function ApiTestPage() {
  try {
    const products = await getProducts();

    return (
      <main>
        <h1>WooCommerce API Test</h1>
        <p>{products.length} products fetched</p>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> — ${product.price} — {product.slug}
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return (
      <main>
        <h1>WooCommerce API Test</h1>
        <p>Failed to fetch products.</p>
        <pre>{message}</pre>
      </main>
    );
  }
}
