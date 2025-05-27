export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save data to local storage with cart management
export function setLocalStorage(key, data) {
  // Get existing cart items
  const cartItems = getLocalStorage(key) || [];
  
  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.Id === data.Id
  );
  
  // Increase quantity if element exist
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].Quantity = 
      (cartItems[existingItemIndex].Quantity || 1) + 1;
  } else {
    // Add new item with quantity
    cartItems.push({...data, Quantity: 1});
  }
  
  // Save updated cart to local storage
  localStorage.setItem(key, JSON.stringify(cartItems));
  
  // Update cart icon
  updateCartIcon();
}

// listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Update cart icon with number of items
export function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart");
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.Quantity || 1), 
    0
  );
  
  // Find or create cart count element
  let cartLink = qs(".cart a");
  let cartCount = qs(".cart-count", cartLink);
  
  if (!cartCount) {
    cartCount = document.createElement("span");
    cartCount.classList.add("cart-count");
    cartLink.appendChild(cartCount);
  }
  
  // show only count if there are items
  cartCount.textContent = totalQuantity > 0 ? totalQuantity : '';
  cartCount.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
}

// Initialize cart icon on page load
export function initCartIcon() {
  updateCartIcon();
}