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
