// ================= LOAD TRENDING PRODUCTS =================
function loadTrendingProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
      const topRatedProducts = products
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 4); // top 4

      displayTrendingProducts(topRatedProducts);
    })
    .catch(err => console.error("Trending error:", err));
}

// ================= DISPLAY TRENDING PRODUCTS =================
function displayTrendingProducts(products) {
  const container = document.getElementById("trending-container");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "trending-card shadow rounded-2xl overflow-hidden";

    card.innerHTML = `
      <div class="w-full h-52 bg-[#422AD5]/5 flex items-center justify-center">
        <img src="${product.image}" class="h-full object-contain" />
      </div>

      <div class="p-5 space-y-2">
        <div class="flex justify-between text-xs">
          <span class="bg-[#422AD5]/30 text-[#422AD5] px-2 py-1 rounded">
            ${product.category}
          </span>
          <span>⭐ ${product.rating.rate} (${product.rating.count})</span>
        </div>

        <p class="font-semibold line-clamp-2">${product.title}</p>
        <p class="font-bold">$${product.price}</p>

        <div class="flex gap-2">
          <button class="btn btn-outline flex-1">
            <i class="fa-regular fa-eye"></i> Details
          </button>

          <button class="btn btn-primary flex-1"
            onclick='addToCart(${JSON.stringify(product)})'>
            <i class="fa-solid fa-cart-arrow-down"></i> Add
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadTrendingProducts);
