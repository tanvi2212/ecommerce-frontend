const productDetail = document.getElementById("productDetail");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Show loading text
productDetail.innerHTML = "<p class='loading'>⏳ Loading product details...</p>";

// Fetch specific product
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  })
  .then(product => {
    productDetail.innerHTML = `
      <div class="product-container">
        <img src="${product.image}" alt="${product.title}">
        <div class="product-info">
          <h2>${product.title}</h2>
          <p class="price">$${product.price}</p>
          <p class="desc">${product.description}</p>
          <button id="addToCartBtn">Add to Cart 🛒</button>
        </div>
      </div>
    `;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ Added to Cart!");
    });
  })
  .catch(err => {
    productDetail.innerHTML = `<p style="color:red;">❌ Error loading product details.</p>`;
    console.error(err);
  });
