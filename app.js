'use strict';

Product.allProducts = [];
var totalCounter = 0;

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

// THESE SHOULD BE REFACTORED - LOOP //
// Instantiate objects - find a way to loop through the img folder instead?
new Product('img/bag.png', 'R2D2 Bag');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/bathroom.jpg', 'iPad Stand');
new Product('img/boots.jpg', 'Useless Boots');
new Product('img/breakfast.jpg', 'Breakfast Bot');
new Product('img/bubblegum.jpg', 'Meatball Bubble Gum');
new Product('img/chair.jpg', 'Uncomfortable Chair');
new Product('img/cthulhu.jpg', 'Lord and Saviour, Cthulhu');
new Product('img/dog-duck.jpg', 'Duck Nose for Your Dog');
new Product('img/dragon.jpg', 'Dragon Meat');
new Product('img/pen.jpg', 'Multiuse Pens');
new Product('img/pet-sweep.jpg', 'Pet Sweeper');
new Product('img/scissors.jpg', 'Pizza Scissors');
new Product('img/shark.jpg', 'Shark Sleeping Bag');
new Product('img/sweep.png', 'Sweeper Onesie');
new Product('img/tauntaun.jpg', 'Tauntaun Blanket');
new Product('img/unicorn.jpg', 'Unicorn Meat');
new Product('img/usb.gif', 'Squid USB Drive');
new Product('img/water-can.jpg', 'Useless Watering Can');
new Product('img/wine-glass.jpg', 'Weird Wine Glass');

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
    console.log(Product.allProducts);
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
    console.log('no more tries');
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

pushRandomProduct();
