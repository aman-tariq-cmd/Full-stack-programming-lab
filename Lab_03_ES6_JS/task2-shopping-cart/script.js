/* ======================================================
   Task 2 — Online Shopping Cart
   script.js
   ====================================================== */

// ── Step 1: Product Catalogue (const array of objects) ─
const catalogue = [
  { id: 1, name: 'Laptop',     emoji: '💻', price: 999 },
  { id: 2, name: 'Headphones', emoji: '🎧', price: 79  },
  { id: 3, name: 'Keyboard',   emoji: '⌨️', price: 49  },
  { id: 4, name: 'Mouse',      emoji: '🖱️', price: 35  },
  { id: 5, name: 'Monitor',    emoji: '🖥️', price: 399 },
  { id: 6, name: 'Webcam',     emoji: '📷', price: 89  },
];

// ── Step 2: Cart state ─────────────────────────────────
let cart = [];   // mutable — items get pushed/removed

// ── Step 3: REST operator — addToCart(...items) ────────
// Accepts one or many product objects
function addToCart(...items) {           // <-- REST operator
  items.forEach(item => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.qty++;                    // increment qty
    } else {
      // Spread item properties into new cart entry
      cart.push({ ...item, qty: 1 });   // <-- SPREAD operator
    }
  });
  renderCart();
}

// ── Step 4: Remove item from cart ─────────────────────
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

// ── Step 5: SPREAD — clone and display cart ───────────
function cloneAndShow() {
  const clonedCart = [...cart];          // <-- SPREAD clone

  const output = document.getElementById('clone-output');
  output.style.display = 'block';

  if (clonedCart.length === 0) {
    output.textContent = '// Cart is empty — add items first!';
    return;
  }

  const lines = clonedCart
    .map(c => `  { name: "${c.name}", qty: ${c.qty}, price: $${c.price} }`)
    .join(',\n');

  output.textContent =
    `// Cloned cart using Spread Operator [...cart]\n[\n${lines}\n]`;
}

// ── Step 6: Render cart with DESTRUCTURING ────────────
function renderCart() {
  // Array Destructuring — first item + rest
  const [firstItem, ...remainingItems] = cart;   // <-- DESTRUCTURING

  // ---- Stats ----
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-price').textContent = `$${totalPrice}`;

  // ---- Show destructured first item ----
  const firstEl = document.getElementById('first-item');
  if (firstItem) {
    firstEl.style.display = 'block';
    firstEl.innerHTML = `
      🔍 <strong>First item (Array Destructuring):</strong>
      ${firstItem.emoji} ${firstItem.name} — $${firstItem.price}
      <br/>
      <span style="color:#9a8e82;font-size:0.75rem">
        ...remaining: ${remainingItems.length} unique product(s)
      </span>`;
  } else {
    firstEl.style.display = 'none';
  }

  // ---- Cart item list ----
  const cartEl = document.getElementById('cart-items');
  if (cart.length === 0) {
    cartEl.innerHTML = '<p class="empty-cart">Your cart is empty — add something!</p>';
    return;
  }

  cartEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <span class="ci-emo">${c.emoji}</span>
      <span class="ci-name">${c.name}</span>
      <span class="ci-qty">×${c.qty}</span>
      <span class="ci-price">$${c.price * c.qty}</span>
      <button class="ci-rm" onclick="removeFromCart(${c.id})">✕</button>
    </div>`).join('');
}

// ── Step 7: Render product cards ──────────────────────
function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';   // clear first

  catalogue.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="emo">${product.emoji}</div>
      <div class="p-name">${product.name}</div>
      <div class="p-price">$${product.price}</div>`;

    // Click → addToCart with REST (could pass multiple)
    card.addEventListener('click', () => addToCart(product));
    grid.appendChild(card);
  });
}

// ── Step 8: Init ───────────────────────────────────────
renderProducts();
renderCart();
