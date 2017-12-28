'use strict';

var form = document.getElementById('order-form');

Product.allProducts = [];
var newProducts = [
  ['img/bag.png', 'R2D2 Bag', '#C0F5F9'],
  ['img/banana.jpg', 'Banana Slicer', '#D2FCEE'],
  ['img/bathroom.jpg', 'iPad Stand', '#E3FEE0'],
  ['img/boots.jpg', 'Useless Boots', '#F1FBCF'],
  ['img/breakfast.jpg', 'Breakfast Bot', '#FAF2BC'],
  ['img/bubblegum.jpg', 'Meatball Bubble Gum', '#FEE5A9'],
  ['img/chair.jpg', 'Uncomfortable Chair', '#FDD599'],
  ['img/cthulhu.jpg', 'Lord and Saviour, Cthulhu', '#F6C28C'],
  ['img/dog-duck.jpg', 'Duck Nose for Your Dog', '#EAAF84'],
  ['img/dragon.jpg', 'Dragon Meat', '#DA9E81'],
  ['img/pen.jpg', 'Multiuse Pens', '#C89083'],
  ['img/pet-sweep.jpg', 'Pet Sweeper', '#B6868B'],
  ['img/scissors.jpg', 'Pizza Scissors', '#A48198'],
  ['img/shark.jpg', 'Shark Sleeping Bag', '#9482A8'],
  ['img/sweep.png', 'Sweeper Onesie', '#8988BA'],
  ['img/tauntaun.jpg', 'Tauntaun Blanket', '#8293CD'],
  ['img/unicorn.jpg', 'Unicorn Meat', '#81A2DF'],
  ['img/usb.gif', 'Squid USB Drive', '#85B4ED'],
  ['img/water-can.jpg', 'Useless Watering Can', '#8FC7F8'],
  ['img/wine-glass.jpg', 'Weird Wine Glass', '#9DD9FE'],
];
var cart = [];

function Product(filepath, stringName, backgroundColor) {
  this.filepath = filepath;
  this.image = filepath.split('/')[1];
  this.name = this.image.split('.')[0];
  this.stringName = stringName;
  this.totalClicks = 0;
  this.timesShown = 0;
  this.previouslyShown = false;
  this.backgroundColor = backgroundColor;
  Product.allProducts.push(this);
};

function Item(product, quantity, first, last, street, city, state, zip, phone, credit) {
  this.product = product;
  this.quantity = quantity;
  this.first = first;
  this.last = last;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.phone = phone;
  this.credit = credit;
};

function instantiateProducts() {
  for(var i = 0; i < newProducts.length; i++) {
    var createProduct = newProducts[i];
    new Product(createProduct[0],createProduct[1],createProduct[2]);
  }
}

// ORDER FORM
function addOptions() {
  instantiateProducts();
  var form = document.getElementById('products');

  for(var i = 0; i < Product.allProducts.length; i++) {
    var option = document.createElement('option');
    option.innerHTML = Product.allProducts[i].stringName;
    option.value = Product.allProducts[i].stringName;

    form.appendChild(option);
  }
}
addOptions();

// SUBMIT BUTTON
function addToCart(event) {
  event.preventDefault();

  var product = event.target.products.value;
  var quantity = event.target.quantity.value;
  var first = event.target.first.value;
  var last = event.target.last.value;
  var street = event.target.street.value;
  var city = event.target.city.value;
  var state = event.target.state.value;
  var zip = event.target.zip.value;
  var phone = event.target.phone.value;
  var credit = event.target.credit.value;

  cart.push(new Item(product, quantity, first, last, street, city, state, zip, phone, credit));

  save();

  form.reset();

  window.location.href = 'cart.html';
};

function save() {
  localStorage.cartItem = JSON.stringify(cart);
  localStorage.productData = JSON.stringify(Product.allProducts);
}

form.addEventListener('submit',addToCart);
