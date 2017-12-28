'use strict';

var cartList = document.getElementById('cart');
var button = document.getElementById('button');

function loadItem() {
  var cartItem = JSON.parse(localStorage.cartItem);
  var productData = JSON.parse(localStorage.productData);
  var filepath = [];

  console.log(cartItem);
  console.log(productData);

  var olEl = document.createElement('ol');
  olEl.setAttribute('id','list');
  cartList.appendChild(olEl);

  for(var j = 0; j < productData.length; j++) {
    if (cartItem[0].product === productData[j].stringName) {
      filepath = productData[j].filepath;
    }
  }

  for(var i = 0; i < cartItem.length; i++) {
    var liEl = document.createElement('li');
    liEl.innerHTML = '<img src="' + filepath + '">';
    olEl.appendChild(liEl);

    liEl = document.createElement('li');
    liEl.innerHTML = 'Item: ' + cartItem[i].product;
    olEl.appendChild(liEl);

    liEl = document.createElement('li');
    liEl.innerHTML = 'Quantity: ' + cartItem[i].quantity;
    olEl.appendChild(liEl);

    liEl = document.createElement('li');
    liEl.innerHTML = 'Name: ' + cartItem[i].first + ' ' + cartItem[i].last;
    olEl.appendChild(liEl);

    liEl = document.createElement('li');
    liEl.innerHTML = 'Street Address: ' + cartItem[i].street;
    olEl.appendChild(liEl);

    liEl = document.createElement('li');
    liEl.innerHTML = 'City/State/Zip: ' + cartItem[i].city + ', ' + cartItem[i].state + ', ' + cartItem[i].zip;
    olEl.appendChild(liEl);

    liEl = document.createElement('li');
    liEl.innerHTML = 'Phone: ' + cartItem[i].phone;
    olEl.appendChild(liEl);

    // liEl = document.createElement('li');
    // liEl.innerHTML = '<button type="submit" id="button">Remove Item</button>';
    // olEl.appendChild(liEl);
  }
}
loadItem();

// code from https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild - couldn't figure this out without MDN...
function removeItem() {
  var myNode = document.getElementById('list');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  localStorage.clear();
}
button.addEventListener('click',removeItem);
