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

// Push product to DOM
function renderProduct(product) {
  var images = document.getElementById('images');
  var imgEl = document.createElement('img');

  var att = document.createAttribute('id');
  att.value = product.name;
  imgEl.setAttributeNode(att); // W3Schools

  att = document.createAttribute('class');
  att.value = 'product-image';
  imgEl.setAttributeNode(att); // W3Schools

  imgEl.src = product.filepath;
  imgEl.addEventListener('click', removeRow);
  images.appendChild(imgEl);
};

// Get random product, use renderProduct to push to DOM
function pushRandomProduct() {
  var counter = 3;

  while (counter > 0) {
    var randomProduct = Product.allProducts[displayRandomProduct()];

    if (randomProduct.previouslyShown === false) {
      renderProduct(randomProduct);
      randomProduct.previouslyShown = true;
      counter--;
    }
  }
}
pushRandomProduct();

function removeRow() {
  // if the image has been shown (previouslyShown = true)
  // remove it using its id
  // set it as pS = false
  for(var i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].previouslyShown === true) {
      var elem = document.getElementById(Product.allProducts[i].name);
      console.log(Product.allProducts[i].name);
      elem.remove(elem);
    }
  }
  pushRandomProduct();
}


// var clickImage = document.getElementsByTagName('img');

// select the element you want the script to respond to

//indicate which event on the nodes will trigger the response

// state the code you want to run








































// foo
