import { setLocalStorage, initCartIcon } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// cart button event handler added
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// listener to Add to Cart button added
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// Initialize cart icon on page load
document.addEventListener("DOMContentLoaded", initCartIcon);