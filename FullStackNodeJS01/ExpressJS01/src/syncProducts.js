import { Product } from "./config/configdb.js";
import { syncAllProductsToMeili } from "./config/meilisearch.js";

const syncProducts = async () => {
  try {
    console.log("Starting product synchronization...");

    const products = await Product.findAll();
    console.log(`Found ${products.length} products in database`);

    if (products.length > 0) {
      await syncAllProductsToMeili(products);
      console.log("Product synchronization completed successfully!");
    } else {
      console.log("No products to sync");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error syncing products:", error);
    process.exit(1);
  }
};

syncProducts();
