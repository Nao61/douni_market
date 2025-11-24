// PRODUCTS DATA (Moved from index.html)
const PRODUCTS = [
  {
    id: 1,
    title: "Tissus Good Luck",
    category: "Tissus",
    price: 10000,
    old_price: 13000,
    image: "assets/img/GoodLuck.jpg",
    description: "Tissus Good Luck de qualité, motifs variés.",
  },
  {
    id: 2,
    title: "Tissus Crêpes",
    category: "Tissus",
    price: 10000,
    old_price: 13000,
    image: "assets/img/TissusCrepes.jpg",
    description: "Tissus Crêpes de qualité, doux et résistant.",
  },
  {
    id: 3,
    title: "Bouquet d'Argent",
    category: "Bouquets",
    price: 50000,
    old_price: 60000,
    image: "assets/img/BouquetDargent.jpg",
    description:
      "Bouquet d'argent personnalisé, prix variable (à partir de 25.000 FCFA).",
  },
  {
    id: 4,
    title: "Colliers et Piercings",
    category: "Bijoux",
    price: 5000,
    old_price: 7000,
    image: "assets/img/piercingEtColliers.jpg",
    description: "Assortiment de colliers et piercings fantaisie.",
  },
  {
    id: 5,
    title: "Bouquet Satin (Roses)",
    category: "Bouquets",
    price: 12000,
    old_price: 15000,
    image: "assets/img/BouquetSatin.jpg",
    description: "Bouquet de roses en satin, finition soignée.",
  },
  {
    id: 6,
    title: "Bouquet Chocolat",
    category: "Bouquets",
    price: 15000,
    old_price: 20000,
    image: "assets/img/BouquetChocolat.jpg",
    description: "Bouquet gourmand en chocolat artisanal.",
  },
  {
    id: 7,
    title: "Bouquet Casquettes (Original)",
    category: "Bouquets",
    price: 25000,
    old_price: 30000,
    image: "assets/img/BouquetCasquette.jpg",
    description: "Bouquet original composé de casquettes.",
  },
  {
    id: 8,
    title: "Faux tatouage pack",
    category: "Bijoux",
    price: 8000,
    old_price: 10000,
    image: "assets/img/FauxTatouages.jpg",
    description: "Pack exclusif de faux tatouages temporaires.",
  },
];

// Basic utilities
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Cart (localStorage)
let cart = JSON.parse(localStorage.getItem("douni_cart") || "[]");

function saveCart() {
  localStorage.setItem("douni_cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(productId, qty = 1) {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return;
  const existing = cart.find((i) => i.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, qty });
  saveCart();
  animateAddToCart(productId);
}

function removeFromCart(productId) {
  cart = cart.filter((i) => i.id !== productId);
  saveCart();
}
function clearCart() {
  cart = [];
  saveCart();
}

function cartTotal() {
  return cart.reduce((s, item) => {
    const p = PRODUCTS.find((x) => x.id === item.id);
    return s + (p ? p.price * item.qty : 0);
  }, 0);
}

function renderProducts(list = PRODUCTS) {
  const grid = $("#productGrid");
  grid.innerHTML = "";
  list.forEach((p) => {
    const el = document.createElement("div");
    el.className =
      "bg-white rounded-lg shadow overflow-hidden transition-transform duration-300 hover:-translate-y-2";
    el.innerHTML = `
      <div class="relative">
            ${
              p.old_price
                ? '<div class="absolute right-2 top-2 px-2 py-1 rounded-full text-xs badge-sale">Promo</div>'
                : ""
            }
            <img class="w-full product-img" src="${p.image}" alt="${p.title}">
          </div>
          <div class="p-4">
            <div class="font-semibold">${p.title}</div>
            <div class="text-sm text-gray-600">${p.description}</div>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex flex-col items-end">
	              ${
                  p.old_price
                    ? `<span class="text-xs text-gray-400 line-through">${p.old_price.toLocaleString()} FCFA</span>`
                    : ""
                }
	              <span class="font-medium text-red-500">${p.price.toLocaleString()} FCFA</span>
	            </div>
              <div class="flex gap-2">
                <button data-id="${
                  p.id
                }" class="addBtn px-3 py-1 rounded-md bg-gradient-to-r from-pink-400 to-yellow-400">Ajouter</button>
                <button data-id="${
                  p.id
                }" class="viewBtn px-3 py-1 rounded-md border border-gray-300">Voir</button>
              </div>
            </div>
          </div>
    `;
    grid.appendChild(el);
  });

  // attach handlers
  $$(".addBtn").forEach((b) =>
    b.addEventListener("click", (e) => {
      addToCart(parseInt(e.currentTarget.dataset.id));
    })
  );
  $$(".viewBtn").forEach((b) =>
    b.addEventListener("click", (e) => {
      openProductModal(parseInt(e.currentTarget.dataset.id));
    })
  );
}

// Product modal (quick)
function openProductModal(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return alert("Produit introuvable");
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";
  modal.innerHTML = `
    <div class="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
          <div class="grid md:grid-cols-2">
            <div class="p-4"><img src="${
              p.image
            }" class="w-full h-64 object-cover rounded-md"></div>
            <div class="p-4">
              <h4 class="text-xl font-semibold">${p.title}</h4>
              <p class="text-sm text-gray-600 my-2">${p.description}</p>
              <div class="font-medium mb-3">${p.price.toLocaleString()} FCFA</div>
              <div class="flex gap-2">
                <input id="qtyInput" type="number" min="1" value="1" class="w-20 px-2 py-1 border rounded-md">
                <button id="modalAdd" class="px-4 py-2 bg-yellow-300 rounded-md">Ajouter au panier</button>
                <button id="modalWhats" class="px-4 py-2 border rounded-md">Commander via WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
  $("#modalAdd").addEventListener("click", () => {
    const q = parseInt($("#qtyInput").value || 1);
    addToCart(p.id, q);
    modal.remove();
  });
  $("#modalWhats").addEventListener("click", () => {
    const q = parseInt($("#qtyInput").value || 1);
    const text = `Bonjour Douni Market, je commande ${q} x ${
      p.title
    } (${p.price.toLocaleString()} FCFA) - Merci.`;
    window.open(
      `https://wa.me/22958369975?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  });
}

// Cart UI
function renderCart() {
  $("#cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
  $("#cartTotal").textContent = cartTotal().toLocaleString() + " FCFA";
  const list = $("#cartList");
  list.innerHTML = "";
  cart.forEach((item) => {
    const p = PRODUCTS.find((x) => x.id === item.id);
    if (!p) return;
    const row = document.createElement("div");
    row.className = "flex items-center gap-3";
    row.innerHTML = `
      <img src="${p.image}" class="w-16 h-16 object-cover rounded">
      <div class="flex-1 text-sm">
        <div class="font-semibold">${p.title}</div>
        <div class="text-xs text-gray-500">${
          item.qty
        } x ${p.price.toLocaleString()} FCFA</div>
      </div>
      <div class="text-right">
        <div class="font-medium">${(
          p.price * item.qty
        ).toLocaleString()} FCFA</div>
        <button class="text-xs text-red-500 removeItem" data-id="${
          p.id
        }">Supprimer</button>
      </div>
    `;
    list.appendChild(row);
  });
  $$(".removeItem").forEach((b) =>
    b.addEventListener("click", (e) => {
      removeFromCart(parseInt(e.currentTarget.dataset.id));
    })
  );
}

// Cart drawer open/close
const cartDrawer = $("#cartDrawer");
function toggleCart() {
  if (cartDrawer.classList.contains("translate-x-full")) {
    cartDrawer.classList.remove("translate-x-full");
  } else {
    cartDrawer.classList.add("translate-x-full");
  }
}
function closeCart() {
  cartDrawer.classList.add("translate-x-full");
}
// Event listeners will be attached in init()

$("#clearCart").addEventListener("click", () => {
  if (confirm("Vider le panier ?")) clearCart();
});

$("#checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return alert("Le panier est vide");
  const lines = cart
    .map((it) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      return `${it.qty}x ${p.title} (${p.price.toLocaleString()} FCFA)`;
    })
    .join("\n");
  const total = cartTotal().toLocaleString();
  const text = `Bonjour Douni Market, je souhaite commander:\n${lines}\nTotal: ${total} FCFA\nAdresse de livraison: `;
  // replace the phone below with the shop phone
  window.open(
    `https://wa.me/22958369975?text=${encodeURIComponent(text)}`,
    "_blank"
  );
});

// Order form send
$("#orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const name = form.get("name");
  const phone = form.get("phone");
  const msg = form.get("message");
  const text = `Commande via site - ${name} | ${phone} : ${msg}`;
  window.open(
    `https://wa.me/22958369975?text=${encodeURIComponent(text)}`,
    "_blank"
  );
});

// MODIFICATION: Message pré-rempli du bouton "Commander via WhatsApp" plus précis.
$("#whatsappQuick").addEventListener("click", () => {
  const text = `Bonjour Douni Market, je souhaite passer une commande et j'aimerais avoir plus d'informations sur les produits et la livraison. Merci.`;
  window.open(
    `https://wa.me/22958369975?text=${encodeURIComponent(text)}`,
    "_blank"
  );
});

// categories
const categoryBtns = $$(".categoryBtn");
function setActiveCategory(btn) {
  categoryBtns.forEach((b) => b.classList.remove("active-category"));
  btn.classList.add("active-category");
}
// Event listeners will be attached in init()

// small add-to-cart animation using GSAP
function animateAddToCart(productId) {
  const card = document.querySelector(`[data-id=\"${productId}\"]`);
  if (!card) return;
  gsap.fromTo(
    card,
    { scale: 1.0 },
    { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 }
  );
}

// GSAP hero animation
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Cards Animation
  gsap.from("#heroCards > div", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: "#heroCards", start: "top 80%" },
  });
  gsap.from("header", { y: -40, opacity: 0, duration: 0.8 });
  gsap.from("#shop h3", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: { trigger: "#shop", start: "top 90%" },
  });

  // 2. About Carousel Logic
  let currentSlide = 0;
  const carouselTrack = $("#carouselTrack");
  const slides = $$("#carouselTrack > div");
  const totalSlides = slides.length;

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    gsap.to(carouselTrack, {
      x: -currentSlide * 100 + "%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }

  $("#prevSlide").addEventListener("click", () => goToSlide(currentSlide - 1));
  $("#nextSlide").addEventListener("click", () => goToSlide(currentSlide + 1));

  // Auto-scroll
  setInterval(() => goToSlide(currentSlide + 1), 3000);

  // Animation de l'ancienne image remplacée par le carousel
  gsap.from("#aboutCarousel", {
    x: 100,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: { trigger: "#about", start: "top 90%" },
  });

  // 3. Reviews Carousel Logic (New)
  let currentReview = 0;
  const reviewsCarousel = $("#reviewsCarousel");
  const reviewSlides = $$("#reviewsCarousel > div");
  const totalReviews = reviewSlides.length;

  function goToReview(index) {
    currentReview = (index + totalReviews) % totalReviews;
    gsap.to(reviewsCarousel, {
      x: -currentReview * 100 + "%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }

  $("#prevReview").addEventListener("click", () =>
    goToReview(currentReview - 1)
  );
  $("#nextReview").addEventListener("click", () =>
    goToReview(currentReview + 1)
  );

  // Auto-scroll for reviews
  setInterval(() => goToReview(currentReview + 1), 3000);

  // 4. GSAP Video Animation (Commenté comme demandé)
  /* const video = document.getElementById("gsapVideo");
  if (false) { // Désactivé comme demandé
    // Use a simple play/pause on entering/leaving the viewport
    ScrollTrigger.create({
      trigger: "#videoContainer",
      start: "top center",
      end: "bottom center",
      onEnter: () => video.play(),
      onLeave: () => video.pause(),
      onEnterBack: () => video.play(),
      onLeaveBack: () => video.pause(),
    });

    // Optional: Scrubbing animation (plus complexe mais plus fluide)
    // video.addEventListener('loadedmetadata', () => {
    //   const videoDuration = video.duration;
    //   gsap.timeline({
    //     scrollTrigger: {
    //       trigger: "#videoContainer",
    //       start: "top top",
    //       end: "+=3000", // Scroll distance to play the video (adjust as needed)
    //       scrub: true,
    //       pin: true,
    //       onUpdate: (self) => {
    //         video.currentTime = videoDuration * self.progress;
    //       },
    //     }
    //   }).to(video, { duration: 1, ease: "none" });
    // });
  } */
}

// init
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  initAnimations();

  // Attach event listeners that were previously inline or missing
  $("#cartBtn").addEventListener("click", toggleCart);
  $("#closeCart").addEventListener("click", closeCart);
  $$(".categoryBtn").forEach((b) =>
    b.addEventListener("click", (e) => {
      const cat = e.currentTarget.textContent.trim();
      setActiveCategory(e.currentTarget);
      if (cat === "Tous") renderProducts(PRODUCTS);
      else renderProducts(PRODUCTS.filter((p) => p.category === cat));
    })
  );

  // Set 'Tous' as active category on load
  const tousBtn = $(".categoryBtn");
  if (tousBtn) setActiveCategory(tousBtn);
});
