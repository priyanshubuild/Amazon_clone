var cur = 0

var products = [
  { id: 1, name: "Gaming Console Bundle", price: 45999, img: "images/Fuji_Gaming_SingleImageCard_C-1._SY304_CB762596570_.jpg", category: "gaming", desc: "Play latest games with this gaming bundle. Good for students." },
  { id: 2, name: "Wireless Headphones", price: 2499, img: "images/product_headset.jpg", category: "electronics", desc: "Bluetooth headphones with good sound. Battery lasts long." },
  { id: 3, name: "Running Shoes", price: 1899, img: "images/product_shoes.jpg", category: "fashion", desc: "Comfortable shoes for daily use and light running." },
  { id: 4, name: "Bluetooth Speaker", price: 3499, img: "images/product_speaker.jpg", category: "electronics", desc: "Portable speaker. Connect with phone using bluetooth." },
  { id: 5, name: "Smart Watch", price: 5999, img: "images/product_watch.jpg", category: "electronics", desc: "Shows time, steps and notifications from phone." },
  { id: 6, name: "Kitchen Storage Box", price: 899, img: "images/51IKhgxg03L._AC_SY200_.jpg", category: "home", desc: "Keep kitchen items organized in this box set." },
  { id: 7, name: "Coffee Maker", price: 3299, img: "images/61CEwh+UVuL._AC_SY200_.jpg", category: "home", desc: "Make coffee at home every morning easily." },
  { id: 8, name: "Wall Clock", price: 599, img: "images/61Gvw0-b0eL._AC_SY200_.jpg", category: "home", desc: "Simple wall clock for bedroom or living room." },
  { id: 9, name: "Women Top", price: 799, img: "images/DQC_APR_TBYB_W_TOPS_1x._SY116_CB623353881_.jpg", category: "fashion", desc: "Casual top for daily wear. Cotton material." },
  { id: 10, name: "Summer Dress", price: 1299, img: "images/DQC_APR_TBYB_W_DRESSES_1x._SY116_CB623353881_.jpg", category: "fashion", desc: "Light dress good for summer season." },
  { id: 11, name: "Kitchen Set", price: 2199, img: "images/Home_Flip_Summer_2024_315_HP_NewArrivals_QuadCard_D_01_1x._SY116_CB555960040_.jpg", category: "home", desc: "Basic kitchen items for new home setup." },
  { id: 12, name: "Father Day Gift Box", price: 999, img: "images/AIS_FDay_2026_02_Fday_01_Muse_Prod_melody_homepage_372x232_1X._SY116_CB780692195_.jpg", category: "deals", desc: "Gift box with multiple small items inside." },
  { id: 13, name: "Gaming Headset", price: 1999, img: "images/product_headset.jpg", category: "gaming", desc: "Headset made for gaming with mic attached." },
  { id: 14, name: "Gaming Mouse Pad", price: 499, img: "images/61o6SkL3DOL._AC_SY200_.jpg", category: "gaming", desc: "Large mouse pad for gaming desk setup." }
]


function changeSlide(n) {
  var slides = document.getElementsByClassName("slide")
  if (slides.length == 0) {
    return
  }
  slides[cur].style.display = "none"
  cur = cur + n
  if (cur >= slides.length) {
    cur = 0
  }
  if (cur < 0) {
    cur = slides.length - 1
  }
  slides[cur].style.display = "block"
}


function getCartFromStorage() {
  var data = localStorage.getItem("amazonCart")
  if (data == null || data == "") {
    return []
  }
  return JSON.parse(data)
}


function saveCartToStorage(cart) {
  localStorage.setItem("amazonCart", JSON.stringify(cart))
}


function updateCartCountOnPage() {
  var cart = getCartFromStorage()
  var count = cart.length
  var countEls = document.getElementsByClassName("cart-count")
  var i
  for (i = 0; i < countEls.length; i = i + 1) {
    countEls[i].innerHTML = count
  }
}


function addToCart(productId) {
  var cart = getCartFromStorage()
  var found = null
  var i
  for (i = 0; i < products.length; i = i + 1) {
    if (products[i].id == productId) {
      found = products[i]
      break
    }
  }
  if (found == null) {
    alert("Product not found")
    return
  }
  cart.push(found)
  saveCartToStorage(cart)
  updateCartCountOnPage()
  alert(found.name + " added to cart!")
}


function removeFromCart(index) {
  var cart = getCartFromStorage()
  cart.splice(index, 1)
  saveCartToStorage(cart)
  updateCartCountOnPage()
  if (window.location.pathname.indexOf("cart.html") != -1) {
    showCartItems()
  }
}


function getProductById(id) {
  var i
  for (i = 0; i < products.length; i = i + 1) {
    if (products[i].id == id) {
      return products[i]
    }
  }
  return null
}


function getUrlParam(name) {
  var url = window.location.href
  var parts = url.split("?")
  if (parts.length < 2) {
    return null
  }
  var params = parts[1].split("&")
  var i
  for (i = 0; i < params.length; i = i + 1) {
    var pair = params[i].split("=")
    if (pair[0] == name) {
      return pair[1]
    }
  }
  return null
}


function loadProductPage() {
  var box = document.getElementById("product-detail")
  if (box == null) {
    return
  }
  var idStr = getUrlParam("id")
  if (idStr == null) {
    box.innerHTML = "<p>Sorry product not found. <a href='index.html'>Go home</a></p>"
    return
  }
  var id = parseInt(idStr)
  var p = getProductById(id)
  if (p == null) {
    box.innerHTML = "<p>Sorry product not found. <a href='index.html'>Go home</a></p>"
    return
  }
  document.title = p.name + " - Amazon"
  var html = ""
  html = html + "<div class='product-detail-left'>"
  html = html + "<img src='" + p.img + "' alt='" + p.name + "'>"
  html = html + "</div>"
  html = html + "<div class='product-detail-right'>"
  html = html + "<h1>" + p.name + "</h1>"
  html = html + "<div class='product-rating'>&#9733;&#9733;&#9733;&#9733;&#9734; 4.2 out of 5</div>"
  html = html + "<hr>"
  html = html + "<div class='product-price'>₹" + p.price + "</div>"
  html = html + "<p class='product-desc'>" + p.desc + "</p>"
  html = html + "<p>In stock</p>"
  html = html + "<button class='btn-buy' onclick='addToCart(" + p.id + ")'>Add to Cart</button>"
  html = html + "<button class='btn-buy-now' onclick='buyNow(" + p.id + ")'>Buy Now</button>"
  html = html + "</div>"
  box.innerHTML = html

  var relatedBox = document.getElementById("related-products")
  if (relatedBox != null) {
    showProductGrid(relatedBox, p.category, p.id)
  }
}


function buyNow(productId) {
  addToCart(productId)
  window.location.href = "cart.html"
}


function showProductGrid(container, category, skipId) {
  var html = ""
  var count = 0
  var i
  for (i = 0; i < products.length; i = i + 1) {
    if (category != null && products[i].category != category) {
      continue
    }
    if (skipId != null && products[i].id == skipId) {
      continue
    }
    html = html + makeProductCard(products[i])
    count = count + 1
    if (count >= 8) {
      break
    }
  }
  container.innerHTML = html
}


function makeProductCard(p) {
  var html = ""
  html = html + "<div class='product-item'>"
  html = html + "<a href='product.html?id=" + p.id + "'>"
  html = html + "<img src='" + p.img + "' alt='" + p.name + "'>"
  html = html + "<h4>" + p.name + "</h4>"
  html = html + "<span class='item-price'>₹" + p.price + "</span>"
  html = html + "</a>"
  html = html + "<button onclick='addToCart(" + p.id + ")'>Add to Cart</button>"
  html = html + "</div>"
  return html
}


function loadCategoryPage(category) {
  var box = document.getElementById("category-products")
  if (box == null) {
    return
  }
  showProductGrid(box, category, null)
}


function loadDealsPage() {
  var box = document.getElementById("category-products")
  if (box == null) {
    return
  }
  var html = ""
  var i
  for (i = 0; i < products.length; i = i + 1) {
    html = html + makeProductCard(products[i])
  }
  box.innerHTML = html
}


function showCartItems() {
  var box = document.getElementById("cart-items-list")
  if (box == null) {
    return
  }
  var cart = getCartFromStorage()
  if (cart.length == 0) {
    box.innerHTML = "<p class='empty-cart'>Your cart is empty. <a href='index.html'>Continue shopping</a></p>"
    document.getElementById("cart-total").innerHTML = "₹0"
    return
  }
  var html = ""
  var total = 0
  var i
  for (i = 0; i < cart.length; i = i + 1) {
    total = total + cart[i].price
    html = html + "<div class='cart-row'>"
    html = html + "<img src='" + cart[i].img + "' alt=''>"
    html = html + "<div class='cart-row-info'>"
    html = html + "<h4>" + cart[i].name + "</h4>"
    html = html + "<p>₹" + cart[i].price + "</p>"
    html = html + "</div>"
    html = html + "<button onclick='removeFromCart(" + i + ")'>Remove</button>"
    html = html + "</div>"
  }
  box.innerHTML = html
  document.getElementById("cart-total").innerHTML = "₹" + total
}


function doSearch() {
  var input = document.getElementById("search-input")
  if (input == null) {
    return
  }
  var text = input.value
  if (text == "" || text == null) {
    alert("Please type something to search")
    return
  }
  alert("Searching for: " + text)
  window.location.href = "deals.html"
}


function backToTopClick() {
  window.scrollTo(0, 0)
}


function validateSignIn() {
  var email = document.getElementById("email-input").value
  var pass = document.getElementById("password-input").value
  if (email == "" || email == null) {
    alert("Please enter email")
    return false
  }
  if (pass == "" || pass == null) {
    alert("Please enter password")
    return false
  }
  if (pass.length < 4) {
    alert("Password should be at least 4 characters")
    return false
  }
  alert("Sign in successful! Welcome to Amazon")
  window.location.href = "index.html"
  return false
}


function makeSliderClickable() {
  var imgs = document.querySelectorAll(".slider-items img")
  var i
  for (i = 0; i < imgs.length; i = i + 1) {
    imgs[i].style.cursor = "pointer"
    imgs[i].setAttribute("data-num", i + 1)
    imgs[i].onclick = function() {
      var num = this.getAttribute("data-num")
      window.location.href = "product.html?id=" + num
    }
  }
}


window.onload = function() {
  updateCartCountOnPage()
  loadProductPage()
  showCartItems()

  var pageName = window.location.pathname
  if (pageName.indexOf("fashion.html") != -1) {
    loadCategoryPage("fashion")
  }
  if (pageName.indexOf("electronics.html") != -1) {
    loadCategoryPage("electronics")
  }
  if (pageName.indexOf("gaming.html") != -1) {
    loadCategoryPage("gaming")
  }
  if (pageName.indexOf("deals.html") != -1) {
    loadDealsPage()
  }

  makeSliderClickable()

  var backBtn = document.querySelector(".back-to-top")
  if (backBtn != null) {
    backBtn.onclick = function(e) {
      e.preventDefault()
      backToTopClick()
    }
  }

  var searchBox = document.getElementById("search-input")
  if (searchBox != null) {
    searchBox.onkeypress = function(e) {
      if (e.keyCode == 13) {
        doSearch()
      }
    }
  }

  if (document.getElementsByClassName("slide").length > 0) {
    setInterval(function() {
      changeSlide(1)
    }, 5000)
  }
}
