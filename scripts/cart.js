// ================= CART STATE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= HELPERS =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.innerText = totalQty;
}

// ================= RENDER CART =================
function renderCartSummary() {
  const container = document.getElementById("cart-summary");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-sm">Cart is empty</p>`;
    return;
  }

  let total = 0;

  container.innerHTML = cart.map(item => {
    total += item.price * item.quantity;

    return `
      <div class="flex justify-between items-center text-xs gap-2">
        <span>${item.title.slice(0, 14)} × ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})" class="text-red-500">✕</button>
      </div>
    `;
  }).join("") + `
    <hr />
    <p class="font-bold text-sm">Total: $${total.toFixed(2)}</p>
  `;
}

// ================= ACTIONS =================
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  renderCartSummary();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  renderCartSummary();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartSummary();
});
