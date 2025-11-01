const productGrid = document.getElementById("productGrid");

// Show loading message
productGrid.innerHTML = "<p class='loading'>⏳ Loading products...</p>";

// Fetch all products from FakeStore API
fetch("https://fakestoreapi.com/products")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  })
  .then(products => {
    productGrid.innerHTML = ""; // clear loading message

    // Loop and create each product card
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <div class="product-info">
          <h3>${product.title.slice(0, 25)}...</h3>
          <p>$${product.price}</p>
          <button onclick="viewProduct(${product.id})">View Details 🔍</button>
        </div>
      `;

      productGrid.appendChild(card);
    });
  })
  .catch(err => {
    productGrid.innerHTML = `<p style="color:red;">❌ Error loading products. Please try again later.</p>`;
    console.error(err);
  });

// Redirect to product detail page with product ID
function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
// STEP 1: Capture Product Details When "Add to Cart" Is Clicked
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");

      // Capture product info
      const product = {
        id: productCard.dataset.id,
        name: productCard.querySelector(".product-title").textContent.trim(),
        price: parseFloat(productCard.querySelector(".product-price").textContent.replace(/[^\d.]/g, '')),
        image: productCard.querySelector("img").src,
        quantity: 1
      };

      // Show in console for now
      console.log("Captured product:", product);

      // Small feedback
      button.textContent = "Added ✓";
      setTimeout(() => (button.textContent = "Add to Cart"), 1000);
    });
  });
});
// STEP 2: Store Cart Data in Local Storage
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");

      // Capture product info
      const product = {
        id: productCard.dataset.id,
        name: productCard.querySelector(".product-title").textContent.trim(),
        price: parseFloat(productCard.querySelector(".product-price").textContent.replace(/[^\d.]/g, '')),
        image: productCard.querySelector("img").src,
        quantity: 1
      };

      // Retrieve existing cart
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        // Update quantity
        existingProduct.quantity += 1;
      } else {
        // Add new product
        cart.push(product);
      }

      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Feedback
      button.textContent = "Added ✓";
      setTimeout(() => (button.textContent = "Add to Cart"), 1000);

      console.log("🛍️ Updated cart:", cart);
    });
  });
});
// STEP 3: Update Cart Count in Real-Time

// Function to update the cart badge in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
  });

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Call this once when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

// Also call it whenever an item is added
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    updateCartCount();
  });
});
// STEP 4: Provide feedback after adding to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const feedback = document.createElement("p");
    feedback.textContent = "✅ Item added to cart successfully!";
    feedback.style.color = "green";
    feedback.style.fontWeight = "500";
    feedback.style.marginTop = "10px";

    // Add feedback message just below the button
    button.parentNode.appendChild(feedback);

    // Remove message after 2 seconds
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  });
});
// 🛒 Update cart count when the page loads
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").textContent = cart.length;
}

// Call it immediately when the page loads
updateCartCount();
document.getElementById("addToCartBtn").addEventListener("click", () => {
  const selectedSize = document.getElementById("sizeSelect").value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Prevent invalid quantity
  if (quantity < 1) quantity = 1;

  // Check if the same product + size already exists
  const existingItem = cart.find(
    item => item.id === product.id && item.size === selectedSize
  );

  if (existingItem) {
    // 🔁 Merge by increasing quantity
    existingItem.quantity += quantity;
  } else {
    // ➕ Add new item
    cart.push({ ...product, size: selectedSize, quantity });
  }

  // 🧠 Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // ✅ Feedback + update count
  document.getElementById("feedback").textContent = "✅ Added to cart successfully!";
  updateCartCount();
});
