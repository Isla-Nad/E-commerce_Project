// Header=================

const navOpen = document.querySelector(".mobile-open-btn");
const navClose = document.querySelector(".mobile-close-btn");
const primaryNavigation = document.querySelector("#primary-navigation");

navOpen.addEventListener("click", () => {
  const visibility = primaryNavigation.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNavigation.setAttribute("data-visible", true);
    navClose.setAttribute("data-visible", true);
  } else {
    primaryNavigation.setAttribute("data-visible", false);
    navClose.setAttribute("data-visible", false);
  }
});
navClose.addEventListener("click", () => {
  const visibility = primaryNavigation.getAttribute("data-visible");
  if (visibility === "true") {
    primaryNavigation.setAttribute("data-visible", false);
    navClose.setAttribute("data-visible", false);
  }
});
// ---------------------------------------------------------------
//login-form------------------------
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
/*****************************************************************************************************/
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const loginInput = document.getElementById("loginInput").value;
  const lpassword = document.getElementById("lpassword").value;
  const rememberMe = document.getElementById("rememberMe").checked;
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const userDataArray = JSON.parse(storedData);
    const user = userDataArray.find((user) => user.username === loginInput || user.email === loginInput);
    if (user) {
      if (user.password === lpassword) {
        if (rememberMe) {
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          document.cookie = `loginInput=${encodeURIComponent(loginInput)}; expires=${expires.toUTCString()}; path=/`;
          document.cookie = `password=${encodeURIComponent(lpassword)}; expires=${expires.toUTCString()}; path=/`;
        }
        window.location.href = "index.html";
        // alert("Login successful!");
      } else {
        alert("Incorrect password. Please try again.");
      }
    } else {
      alert("Username or email not found. Please check your credentials or register first.");
    }
  } else {
    alert("No registered users found. Please register first.");
  }
});
/*****************************************************************************************************/
document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const rpassword = document.getElementById("rpassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (rpassword !== confirmPassword) {
    alert("Passwords do not match. Please re-enter the password.");
    return;
  }
  const existingData = localStorage.getItem("userData");
  if (existingData) {
    const userDataArray = JSON.parse(existingData);
    const existingUser = userDataArray.find((user) => user.username === username);
    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
      return;
    }
    const existingEmail = userDataArray.find((user) => user.email === email);
    if (existingEmail) {
      alert("This email is already registered. Please use a different email address.");
      return;
    }
  }
  const userData = {
    username: username,
    email: email,
    password: rpassword,
  };
  const storedData = localStorage.getItem("userData");
  let userDataArray = storedData ? JSON.parse(storedData) : [];
  userDataArray.push(userData);
  localStorage.setItem("userData", JSON.stringify(userDataArray));
  alert("Registration successful!");
});

/*****************************************************************************************************/

const loginIcon = document.querySelector("#login-icon");
const loginWrapper = document.querySelector("#login-box");
const loginClose = document.querySelector("#login-close-btn");
loginIcon.addEventListener("click", () => {
  const showLogin = loginWrapper.getAttribute("data-visible");
  if (showLogin === "false") {
    loginWrapper.setAttribute("data-visible", true);
  } else {
    loginWrapper.setAttribute("data-visible", false);
  }
});
loginClose.addEventListener("click", () => {
  const showLogin = loginWrapper.getAttribute("data-visible");
  if (showLogin === "true") {
    loginWrapper.setAttribute("data-visible", false);
  }
});
// ---------------------------------------------------------------------
// search input------------------------
let arr = ["Trundle Bed", "Arm Chair", "Patio Table", "Picnic Table", "Dining Table", "Egg Chair", "Frame-only Bed", "WingBack Chair", "Lawson Sofa","Steel Table","Alien Sofa","Double Bed","Lazy Chair"];
let searchInp = document.querySelector("#search-input");
let searchCon = document.querySelector("#search-box div");
searchInp.addEventListener("keyup", () => {
  let searchVal = searchInp.value.toLowerCase();
  searchCon.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase().includes(searchVal) && searchVal != "" && searchVal != " ") {
      searchCon.innerHTML += `<a href="shop.html" class="search-items">${arr[i]}</a><br>`;
    }
  }
});
const searchBox = document.querySelector("#search-box");
const searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener("click", () => {
  const showSearch = searchBox.getAttribute("data-visible");
  if (showSearch === "false") {
    searchBox.setAttribute("data-visible", true);
  } else {
    searchBox.setAttribute("data-visible", false);
  }
});
// ---------------------------------------------------------------------zzzzzzzzz
// ---------------------------------------------------------------------
// cart-menu------------------------

const shoppingCart = document.querySelector("#cart-icon");
const cartItem = document.querySelector("#cart-box");
const crossBtn = document.querySelector(".cross-btn");

shoppingCart.addEventListener("click", () => {
  const showCart = cartItem.getAttribute("data-visible");
  if (showCart === "false") {
    cartItem.setAttribute("data-visible", true);
  } else {
    cartItem.setAttribute("data-visible", false);
  }
});
crossBtn.addEventListener("click", () => {
  const showCart = cartItem.getAttribute("data-visible");
  if (showCart === "true") {
    cartItem.setAttribute("data-visible", false);
  }
});
// ==========================================================
// side Bar Nav======================
let sideNav = document.querySelector("#side-nav");
let arrow = document.querySelector("#arrow");
arrow.addEventListener("click", () => {
  let categoryShow = sideNav.getAttribute("data-category");
  if (categoryShow === "false") {
    sideNav.setAttribute("data-category", true);
    arrow.setAttribute("data-category", true);
  } else {
    sideNav.setAttribute("data-category", false);
    arrow.setAttribute("data-category", false);
  }
});
// ==========================================================================
// products API=================================================
function fetchData() {
  fetch("./products.json")
    .then((response) => response.json())
    .then((data) => {
      const list_element = document.querySelector(".shop-product");
      const pagination_element = document.getElementById("pagination");

      let current_page = 1;
      let products_per_page = 9;

      function DisplayList(items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";

        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
          let html = `<div class="product-list grid">
                        <img src="${paginatedItems[i].img}" alt="" />
                        <p class="fs-montserrat bold-600">${paginatedItems[i].title}</p>
                        <div class="shop-btn flex">
                          <button class="text-white fs-montserrat bg-red" onclick="addTocart(${paginatedItems[i].id})">Add to Cart</button>
                          <p class="fs-montserrat bold-700">$ ${paginatedItems[i].price}</p>
                        </div>
                        <!-- ======================popup=========================== -->
                        <div class="pup-up"">
                          <p class="fs-poppins"><i class="uil uil-star">${paginatedItems[i].rating}</i></p>
                        </div>
                      </div>`;
          wrapper.innerHTML += html;
        }
      }

      function SetupPagination(items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";

        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
          let btn = PaginationButton(i, items);
          wrapper.appendChild(btn);
        }
      }

      function PaginationButton(page, items) {
        let button = document.createElement("button");
        button.innerText = page;

        if (current_page == page) button.classList.add("activate");

        button.addEventListener("click", function () {
          current_page = page;
          DisplayList(items, list_element, products_per_page, current_page);

          let current_btn = document.querySelector("#pagination button.activate");
          current_btn.classList.remove("activate");

          button.classList.add("activate");
        });

        return button;
      }

      DisplayList(data, list_element, products_per_page, current_page);
      SetupPagination(data, pagination_element, products_per_page);
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();
// ======================================================================
// cart==================================================================
let request = new XMLHttpRequest();
request.open("GET", "./products.json", false);
request.send();
const products = JSON.parse(request.responseText);

let cartItemEl = document.querySelector(".cart-items");
let totalEl = document.querySelector(".total");
let totalIt = document.querySelector(".totalItems");
let isEpmty = document.querySelector(".is-empty");
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
function addTocart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

function updateCart() {
  renderCartItem();
  renderTotal();
  localStorage.setItem("CART", JSON.stringify(cart));
  if (localStorage.getItem("CART") == "[]") {
    isEpmty.classList.remove("is-empty");
  } else {
    isEpmty.classList.add("is-empty");
  }
}

function renderCartItem() {
  cartItemEl.innerHTML = "";
  cart.forEach((item) => {
    cartItemEl.innerHTML += `
    <div class="cart-item flex">
      <div class="item-img"><img width="150" src="${item.img}" alt="${item.title}" /></div>
      <div class="item-price">$ ${item.price}</div>
      <div class="units">
        <div class="item-btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
        <div class="number">${item.numberOfUnits}</div>
        <div class="item-btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
      </div>
      <div class="item-remove"><i class="uil uil-trash-alt" onclick="removeItemFromCart(${item.id})"></i></div>
      </div>
    </div>
    `;
  });
}
function renderTotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  totalEl.innerHTML = `Total: ${totalItems} [items] $ ${totalPrice.toFixed(2)}`;
  totalIt.textContent = totalItems;
}
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    return { ...item, numberOfUnits };
  });
  updateCart();
}
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
// ==============================================================================
// search products===============================================================
let searchInput = document.querySelector("#sidebar-search");
let productCon = document.querySelector(".shop-product");
searchInput.addEventListener("keyup", () => {
  let searchVal = searchInput.value.toLowerCase();
  let product = productCon.querySelectorAll(".product-list");
  for (let i = 0; i < product.length; i++) {
    let span = product[i].querySelector(".product-list>p");
    if (span.innerHTML.toLowerCase().indexOf(searchVal) != -1) {
      product[i].style.display = "initial";
    } else {
      product[i].style.display = "none";
    }
  }
});
// ==============================================================================
// category products=============================================================
let category = document.querySelectorAll(".shop-category-list li");
for (let i = 0; i < category.length; i++) {
  category[i].addEventListener("click", (e) => {
    let categoryBtn = e.target.textContent.toLowerCase();
    let productList = productCon.querySelectorAll(".product-list");
    productList.forEach((product) => {
      let productTitle = product.querySelector("p").textContent.toLowerCase();
      if (categoryBtn == "all") {
        product.style.display = "initial";
      } else if (productTitle.includes(categoryBtn)) {
        product.style.display = "initial";
      } else {
        product.style.display = "none";
      }
    });
  });
}
// ===================================================================================
// sorting products===================================================================
function renderSortedProdects() {
  document.querySelector(".shop-product").innerHTML = " ";
  products.forEach((product) => {
    let html = `<div class="product-list grid">
                  <img src="${product.img}" alt="" />
                  <p class="fs-montserrat bold-600">${product.title}</p>
                  <div class="shop-btn flex">
                    <button class="text-white fs-montserrat bg-red" onclick="addTocart(${product.id})">Add to Cart</button>
                    <p class="fs-montserrat bold-700">$ ${product.price}</p>
                  </div>
                  <!-- ======================popup=========================== -->
                  <div class="pup-up"">
                    <p class="fs-poppins"><i class="uil uil-star">${product.rating}</i></p>
                  </div>
                </div>`;
    document.querySelector(".shop-product").innerHTML += html;
  });
}
const originalProducts = [...products];
function renderUnsortedProdects() {
  document.querySelector(".shop-product").innerHTML = " ";
  originalProducts.forEach((product) => {
    let html = `<div class="product-list grid">
                  <img src="${product.img}" alt="" />
                  <p class="fs-montserrat bold-600">${product.title}</p>
                  <div class="shop-btn flex">
                    <button class="text-white fs-montserrat bg-red" onclick="addTocart(${product.id})">Add to Cart</button>
                    <p class="fs-montserrat bold-700">$ ${product.price}</p>
                  </div>
                  <!-- ======================popup=========================== -->
                  <div class="pup-up"">
                    <p class="fs-poppins"><i class="uil uil-star">${product.rating}</i></p>
                  </div>
                </div>`;
    document.querySelector(".shop-product").innerHTML += html;
  });
}

let mySelect = document.querySelector("#my-select");
mySelect.addEventListener("change", function () {
  if (mySelect.value === "default") {
    renderUnsortedProdects();
  } else if (mySelect.value === "name") {
    products.sort((a, b) => a.title.localeCompare(b.title));
    renderSortedProdects();
  } else if (mySelect.value === "rating") {
    products.sort((a, b) => b.rating - a.rating);
    renderSortedProdects();
  } else if (mySelect.value === "lowToHigh") {
    products.sort((a, b) => a.price - b.price);
    renderSortedProdects();
  } else if (mySelect.value === "highToLow") {
    products.sort((a, b) => b.price - a.price);
    renderSortedProdects();
  }
});
