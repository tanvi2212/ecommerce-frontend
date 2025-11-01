const productGrid = document.getElementById("productGrid");

// Show loading message before fetching products
productGrid.innerHTML = "<p class='loading'>⏳ Loading products...</p>";

// Fetch product data from the API
fetch("https://fakestoreapi.com/products?limit=8")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(products => {
    // Clear the loading message
    productGrid.innerHTML = "";

    // Loop through each product and create cards dynamically
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <div class="product-info">
          <h3>${product.title.slice(0, 25)}...</h3>
          <p>$${product.price}</p>
          <button>Add to Cart 🛒</button>
        </div>
      `;
      productGrid.appendChild(card);
    });
  })
  .catch(error => {
    // Display error message if API fails
    productGrid.innerHTML = `<p style="color:red;">❌ Failed to load products. Please try again later.</p>`;
    console.error("Error fetching products:", error);
  });
