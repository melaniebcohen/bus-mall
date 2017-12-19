'use strict';

Product.allProducts = [];
var totalCounter = 0;

var newProducts = [
  ['img/bag.png', 'R2D2 Bag'],
  ['img/banana.jpg', 'Banana Slicer'],
  ['img/bathroom.jpg', 'iPad Stand'],
  ['img/boots.jpg', 'Useless Boots'],
  ['img/breakfast.jpg', 'Breakfast Bot'],
  ['img/bubblegum.jpg', 'Meatball Bubble Gum'],
  ['img/chair.jpg', 'Uncomfortable Chair'],
  ['img/cthulhu.jpg', 'Lord and Saviour, Cthulhu'],
  ['img/dog-duck.jpg', 'Duck Nose for Your Dog'],
  ['img/dragon.jpg', 'Dragon Meat'],
  ['img/pen.jpg', 'Multiuse Pens'],
  ['img/pet-sweep.jpg', 'Pet Sweeper'],
  ['img/scissors.jpg', 'Pizza Scissors'],
  ['img/shark.jpg', 'Shark Sleeping Bag'],
  ['img/sweep.png', 'Sweeper Onesie'],
  ['img/tauntaun.jpg', 'Tauntaun Blanket'],
  ['img/unicorn.jpg', 'Unicorn Meat'],
  ['img/usb.gif', 'Squid USB Drive'],
  ['img/water-can.jpg', 'Useless Watering Can'],
  ['img/wine-glass.jpg', 'Weird Wine Glass'],
];

function Product(filepath, stringName) {
  this.filepath = filepath;
  this.image = filepath.split('/')[1];
  this.name = this.image.split('.')[0];
  this.stringName = stringName;
  this.timesShown = 0;
  this.totalClicks = 0;
  this.previouslyShown = false;
  Product.allProducts.push(this);
};

function instantiateProducts() {
  for(var i = 0; i < newProducts.length; i++) {
    var createProduct = newProducts[i];
    new Product(createProduct[0],createProduct[1]);
  }
}

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

// Push product to DOM, event listeners
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
  images.appendChild(imgEl);

  imgEl.addEventListener('click', function() {
    var imgId = this.id;
    replaceImages();
    counter();

    for(var i = 0; i < Product.allProducts.length; i++) {
      if (imgId === Product.allProducts[i].name) {
        Product.allProducts[i].totalClicks += 1;
      }
    }
  }
  );
};

// Get random product, use renderProduct to push to DOM
function pushRandomProduct() {
  if (totalCounter < 24) {
    var counter = 3;

    while (counter > 0) {
      var randomProduct = Product.allProducts[displayRandomProduct()];

      if (randomProduct.previouslyShown === false) {
        renderProduct(randomProduct);
        randomProduct.timesShown += 1;
        randomProduct.previouslyShown = true;
        counter--;
      }
    }
  } else {
    displayResults();
  }
}

// Remove existing images, set previous images to "true" for previously shown, increment total counter
function replaceImages() {
  var shownBefore = [];

  for(var i = 0; i < Product.allProducts.length; i++) {
    var elem = document.getElementById(Product.allProducts[i].name);

    if (Product.allProducts[i].previouslyShown === true) {
      elem = document.getElementById(Product.allProducts[i].name);
      elem.remove(elem);
      shownBefore.push(Product.allProducts[i]);
    }
  }
  pushRandomProduct();
  shownBefore[0].previouslyShown = false;
  shownBefore[1].previouslyShown = false;
  shownBefore[2].previouslyShown = false;

}

function counter() {
  totalCounter += 1;
}

function displayResults() {
  var images = document.getElementById('images');
  var h2El = document.createElement('h2');
  h2El.innerHTML = 'Total Product Votes: ';
  images.appendChild(h2El);

  var userTotals = document.getElementById('images');

  for(var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');

    if (Product.allProducts[i].totalClicks === 1) {
      liEl.innerHTML = Product.allProducts[i].totalClicks + ' vote for the ' + Product.allProducts[i].stringName;
    } else {
      liEl.innerHTML = Product.allProducts[i].totalClicks + ' votes for the ' + Product.allProducts[i].stringName;
    }
    userTotals.appendChild(liEl);
  }
}

function runFocusGroup() {
  instantiateProducts();
  pushRandomProduct();
}
runFocusGroup();
