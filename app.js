// PROBLEM: Whenever I refresh the page, the totalClicks doesn't come over

'use strict';

Product.allProducts = [];
var totalCounter = 0;
var totalClicksArr = [];
var allProductNames = [];
var productBgColors = [];

var newProducts = [
  // hex codes from https://krazydad.com/tutorials/makecolors.php
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

function load() {
  console.log(localStorage.totalCounter);
  if ((localStorage.totalCounter === '24') && localStorage.productData) {
    Product.allProducts = JSON.parse(localStorage.productData);
    removeAllProducts();
    pushResultsToArrays();
    drawChart();
  } else if (localStorage.productData) {
    for(var j = 0; j < Product.allProducts; j++) {
      Product.allProducts[j] = JSON.parse(localStorage.productData);
    }
    runFocusGroup();
  } else {
    runFocusGroup();
  }
}

function instantiateProducts() {
  for(var i = 0; i < newProducts.length; i++) {
    var createProduct = newProducts[i];
    new Product(createProduct[0],createProduct[1],createProduct[2]);
  }
}

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

  imgEl.src = product.filepath;
  images.appendChild(imgEl);

  imgEl.addEventListener('click', clickEvent);
};

// Event listener - increment totalClicks on click
function clickEvent(event) {
  if (totalCounter < 24) {
    replaceImages();
    totalCounter += 1;

    for(var i = 0; i < Product.allProducts.length; i++) {
      if (event.target.id === Product.allProducts[i].name) {
        Product.allProducts[i].totalClicks += 1;
      }
    }
  } else {
    for(var j = 0; j < Product.allProducts.length; j++) {
      if (event.target.id === Product.allProducts[j].name) {
        Product.allProducts[j].totalClicks += 1;
      }
    }
    save();
    removeAllProducts();
    pushResultsToArrays();
    drawChart();
  }
}

// Get random product, use renderProduct to push to DOM
function pushRandomProduct() {
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

function removeAllProducts() {
  var elem = document.getElementById('images');
  elem.remove();
}

// push results to arrays for chart generation
function pushResultsToArrays() {
  for(var i = 0; i < Product.allProducts.length; i++) {
    totalClicksArr.push(Product.allProducts[i].totalClicks);
  }
  for(var j = 0; j < Product.allProducts.length; j++) {
    allProductNames.push(Product.allProducts[j].stringName);
  }
  for(var k = 0; k < Product.allProducts.length; k++) {
    productBgColors.push(Product.allProducts[k].backgroundColor);
  }
}

// save data to local storage
function save() {
  localStorage.productData = JSON.stringify(Product.allProducts);
  localStorage.totalCounter = totalCounter;
}

function runFocusGroup() {
  instantiateProducts();
  pushRandomProduct();
}

load();

// CREATE FUNCTION - push ONLY when 25 turns complete
function drawChart() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allProductNames,
      // array of labels assigned up above
      datasets: [{
        label: '# of Selections',
        data: totalClicksArr,
        backgroundColor: productBgColors,
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        fontFamily: 'Avenir',
        fontColor: '#000',
        text: 'Total Product Selections',
        fontSize: 26,
        padding: 20,
      },
      barPercentage: 1,
      categoryPercentage: 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            suggestedMax: 4,
          },
        }],
        // found fix for x axis at https://github.com/jtblin/angular-chart.js/issues/423
        xAxes: [{
          ticks: {
            autoSkip: false,
          }
        }]
      }
    }
  });
}
