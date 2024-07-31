// search bar on header

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
      searchSite(searchTerm);
    }
  });

  function searchSite(term) {
    const contentSections = document.querySelectorAll("section");
    let results = [];

    contentSections.forEach((section) => {
      if (section.innerText.toLowerCase().includes(term)) {
        results.push(section);
      }
    });

    displaySearchResults(results, term);
  }

  function displaySearchResults(results, term) {
    const resultsModal = document.createElement("div");
    resultsModal.classList.add("search-results-modal");

    let resultsHTML = `<h2>Search Results for "${term}"</h2>`;

    if (results.length > 0) {
      resultsHTML += "<ul>";
      results.forEach((result) => {
        resultsHTML += `<li><a href="#${result.id}">${
          result.querySelector("h2").innerText
        }</a></li>`;
      });
      resultsHTML += "</ul>";
    } else {
      resultsHTML += "<p>No results found.</p>";
    }

    resultsHTML += '<button id="close-search-results">Close</button>';

    resultsModal.innerHTML = resultsHTML;
    document.body.appendChild(resultsModal);

    document
      .getElementById("close-search-results")
      .addEventListener("click", function () {
        document.body.removeChild(resultsModal);
      });
  }
});

// hamburger menu

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.querySelector(".mobile-menu");

  mobileMenuIcon.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
    });
  });
});

// About us slider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 30;
  let currentIndex = 0;

  function moveSlider(direction) {
    if (direction === "next") {
      currentIndex = (currentIndex + 1) % cards.length;
    } else {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    updateSliderPosition();
  }

  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  // Automatic sliding
  let autoSlideInterval = setInterval(() => moveSlider("next"), 4000);

  // touch swipe functionality for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      moveSlider("next");
    }
    if (touchEndX - touchStartX > 50) {
      moveSlider("prev");
    }
  }

  updateSliderPosition();
});

// product section
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalProductTitle");
  const modalImage = document.getElementById("modalProductImage");
  const modalDescription = document.getElementById("modalProductDescription");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".product-item");
      modalTitle.textContent = product.querySelector("h3").textContent;
      modalImage.src = product.querySelector("img").src;
      modalDescription.textContent = product.querySelector("p").textContent;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

// newsletter section

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("signup-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    setTimeout(() => {
      message.textContent = `Thank you, ${name}! You've successfully signed up for our newsletter.`;
      message.className = "success";
      form.reset();

      setTimeout(() => {
        message.textContent = "";
        message.className = "";
      }, 5000);
    }, 1000);
  });
});

// Hero section

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentSlide = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  setInterval(nextSlide, 3000);
});

// our products section

document.addEventListener("DOMContentLoaded", function () {
  const categoryNav = document.querySelector(".category-nav");
  const productItems = document.querySelectorAll(".product-item");
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalProductTitle");
  const modalImage = document.getElementById("modalProductImage");
  const modalDescription = document.getElementById("modalProductDescription");
  const closeBtn = document.querySelector(".close");

  categoryNav.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const category = e.target.getAttribute("data-category");

      categoryNav.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");

      productItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  });

  // Modal functionality
  productItems.forEach((item) => {
    const viewDetailsBtn = item.querySelector(".view-details");
    viewDetailsBtn.addEventListener("click", function () {
      modalTitle.textContent = item.querySelector("h3").textContent;
      modalImage.src = item.querySelector("img").src;
      modalDescription.textContent = item.querySelector("p").textContent;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Shop section
const products = [
  { id: 1, name: "Eco-Friendly Pesticide", price: 3000 },
  { id: 2, name: "Organic Fertilizer", price: 2900 },
  { id: 3, name: "High-Yield Corn Seeds", price: 3450 },
  { id: 4, name: "Soil pH Tester", price: 1500 },
];

const productList = document.querySelector(".product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product-item">
            <h3>${product.name}</h3>
            <p>ksh${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <li>${item.name} - ksh ${item.price.toFixed(2)}</li>
    `
    )
    .join("");
  cartTotal.textContent = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);
}

checkoutBtn.addEventListener("click", () => {
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
});

renderProducts();

// Order Tracking section
const trackingForm = document.getElementById("tracking-form");
const trackingResult = document.getElementById("tracking-result");

trackingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const orderNumber = document.getElementById("order-number").value;
  const orderEmail = document.getElementById("order-email").value;

  setTimeout(() => {
    trackingResult.innerHTML = `
            <h3>Order Status</h3>
            <p>Order Number: ${orderNumber}</p>
            <p>Status: In Transit</p>
            <p>Estimated Delivery: July 31, 2024</p>
        `;
  }, 1000);
});

// careers section
const jobOpenings = [
  {
    id: 1,
    title: "Agricultural Scientist",
    description: "Research and develop new methods for crop production.",
  },
  {
    id: 2,
    title: "Sales Representative",
    description: "Promote and sell our products to farmers and distributors.",
  },
  {
    id: 3,
    title: "Product Manager",
    description: "Oversee the development and marketing of our product lines.",
  },
];

const jobOpeningsContainer = document.querySelector(".job-openings");
const jobDetails = document.getElementById("job-details");
const applicationForm = document.getElementById("application-form");

function renderJobOpenings() {
  jobOpeningsContainer.innerHTML = jobOpenings
    .map(
      (job) => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <button onclick="showJobDetails(${job.id})">View Details</button>
        </div>
    `
    )
    .join("");
}

function showJobDetails(jobId) {
  const job = jobOpenings.find((j) => j.id === jobId);
  jobDetails.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <button onclick="showApplicationForm(${job.id})">Apply Now</button>
    `;
  applicationForm.style.display = "none";
}

function showApplicationForm(jobId) {
  applicationForm.style.display = "block";
  applicationForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("applicant-name").value;
    const email = document.getElementById("applicant-email").value;
    const message = document.getElementById("applicant-message").value;
    alert(`Thank you for your application, ${name}! We will contact you soon.`);
    applicationForm.reset();
    applicationForm.style.display = "none";
  };
}

renderJobOpenings();

// contact section

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      console.log("Form submitted with the following data:");
      for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
      }

      this.reset();
      alert("Thank you for your message. We will get back to you soon!");
    });
  }
});

// Back to Top button functionality
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
