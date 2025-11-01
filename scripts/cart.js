// 🛒 Load and display cart data from local storage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty 🛍️</p>";
    cartTotal.textContent = 0;
    cartCount.textContent = 0;
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    // 🧱 Create product row dynamically
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Size: ${item.size}</p>
        <p>Price: ₹${item.price}</p>
      </div>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">−</button>
        <span>${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <p>Subtotal: ₹${item.price * item.quantity}</p>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // 🧮 Update total
  cartTotal.textContent = total;
  cartCount.textContent = cart.length;

  // 🔁 Reattach event listeners for quantity buttons
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", increaseQuantity);
  });
  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", decreaseQuantity);
  });
}

// ➕ Increase quantity
function increaseQuantity(e) {
  let index = e.target.dataset.index;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ➖ Decrease quantity (minimum 1)
function decreaseQuantity(e) {
  let index = e.target.dataset.index;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    alert("Quantity cannot be less than 1.");
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// 🔃 Initialize cart
loadCart();

// 🛒 Load and display cart data from local storage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty 🛍️</p>";
    cartTotal.textContent = 0;
    cartCount.textContent = 0;
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    // 🧱 Create product row dynamically
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Size: ${item.size}</p>
        <p>Price: ₹${item.price}</p>
      </div>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">−</button>
        <span>${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <p>Subtotal: ₹${item.price * item.quantity}</p>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // 🧮 Update total price
  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
  const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.disabled = cart.length === 0;
checkoutBtn.style.opacity = cart.length === 0 ? "0.6" : "1";


  // 🔁 Event listeners
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", increaseQuantity);
  });
  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", decreaseQuantity);
  });
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", removeItem);
  });
}

// ➕ Increase quantity
function increaseQuantity(e) {
  let index = e.target.dataset.index;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ➖ Decrease quantity (minimum 1)
function decreaseQuantity(e) {
  let index = e.target.dataset.index;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    alert("Quantity cannot be less than 1.");
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ❌ Remove item from cart
function removeItem(e) {
  let index = e.target.dataset.index;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // remove item
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // refresh UI
}

// 🔃 Initialize cart when page loads
loadCart();
