const products = [
  {
    id: 1,
    name: "Парфюм мужской AVON FULL SPEED MAX TURBO 100 мл.",
    price: 6500,
    image: "images/avon_full_speed_maxturbo.jpg"
  },
  {
    id: 2,
    name: " Парфюм мужской ORIFLAME POSSESS MAN 75 мл.",
    price: 16100,
    image: "images/posses_man_classic.jpg"
  },
  {
    id: 3,
    name: "Парфюм мужской ORIFLAME POSSESS ABSOLUT MAN 75 мл.",
    price: 16100,
    image: "images/possess_absolut_man.jpg"
  },
  {
    id: 4,
    name: "Парфюм мужской ORIFLAME POSSESS THE SECRET MAN 75 мл.",
    price: 16100,
    image: "images/possess_the_secret_man.jpg"
  },
  {
    id: 5,
    name: "Парфюм мужской FABERLIC 8 ELEMENT 100 мл.",
    price: 5800,
    image: "images/faberlic_8element.jpg"
  }
];

const cart = [];

const money = amount =>
  new Intl.NumberFormat("ru-RU").format(amount) + " ₸";

function renderProducts() {
  const container = document.getElementById("products");

  container.innerHTML = products.map(product => `
    <article class="product">
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >
      <h3>${product.name}</h3>
      <p class="price">${money(product.price)}</p>
      <button
        class="primary-button"
        onclick="addToCart(${product.id})"
      >
        В корзину
      </button>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");

  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = money(total);

  if (cart.length === 0) {
    container.textContent = "Пока здесь пусто.";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <span>${item.name} × ${item.quantity}</span>
      <span>${money(item.price * item.quantity)}</span>
      <button
        class="remove-button"
        onclick="removeFromCart(${item.id})"
        aria-label="Удалить ${item.name}"
      >
        Удалить
      </button>
    </div>
  `).join("");
}

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Сначала добавь товар в корзину.");
    return;
  }

  // Замени номер на свой номер WhatsApp:
  // код страны + номер, только цифры.
  const phone = "87772385564";

  const lines = cart.map(item =>
    `${item.name} × ${item.quantity} — ${
      money(item.price * item.quantity)
    }`
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const message = [
    "Здравствуйте! Хочу оформить заказ:",
    "",
    ...lines,
    "",
    `Итого: ${money(total)}`
  ].join("\n");

  const url =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

renderProducts();
renderCart();