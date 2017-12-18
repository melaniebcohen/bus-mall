'use strict';

Product.allProducts = [];

function Product(filepath) {
  this.filepath = filepath;
  this.image = filepath.split('/')[1];
  this.name = this.image.split('.')[0];
  this.totalClicks = 0;
  this.previouslyShown = false;
  Product.allProducts.push(this);
};

// Instantiate objects - find a way to loop through the img folder instead?
new Product('img/bag.png');
new Product('img/banana.jpg');
new Product('img/bathroom.jpg');
new Product('img/boots.jpg');
new Product('img/breakfast.jpg');
new Product('img/bubblegum.jpg');
new Product('img/chair.jpg');
new Product('img/cthulhu.jpg');
new Product('img/dog-duck.jpg');
new Product('img/dragon.jpg');
new Product('img/pen.jpg');
new Product('img/pet-sweep.jpg');
new Product('img/scissors.jpg');
new Product('img/shark.jpg');
new Product('img/sweep.png');
new Product('img/tauntaun.jpg');
new Product('img/unicorn.jpg');
new Product('img/usb.gif');
new Product('img/water-can.jpg');
new Product('img/wine-glass.jpg');

console.log(Product.allProducts);

// Generate random number
function getRandomIntInclusive(min, max) { // from MDN
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pull product at randomized index number
function displayRandomProduct() {
  return (getRandomIntInclusive(1, Product.allProducts.length) - 1);
};

displayRandomProduct();

// Push product to DOM
function renderProduct() {
  var images = document.getElementById('images');
  var imgEl = document.createElement('img');
  imgEl.src = Product.allProducts[displayRandomProduct()].filepath;
  images.appendChild(imgEl);
};

function pushRandomProduct() {
  if (Product.allProducts[displayRandomProduct()].previouslyShown === false) {
    // push image into DOM
    renderProduct();
    console.log('yep');
  } else {
    console.log('nope');
  }
  // if Product.allProducts.previouslyShown is false - SHOW
};
pushRandomProduct();









































// foo
