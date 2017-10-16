(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let dom = require("./dom.js");

let categories = [];
let types = [];
let products = [];

var categoriesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./data/categories.json').done((data1) => {
			resolve(data1.categories);
		}).fail((error1) => {
			reject(error1);
		});
	});
};
	
var typesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./data/types.json').done((data2) => {
			resolve(data2.types);
		}).fail((error2) => {
			reject(error2);
		});
	});
};

var productsJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./data/products.json').done((data3) => {
			resolve(data3.products);		
		}).fail((error3) => {
			reject(error3);
		});
	});
};

const dataGetter = () => {
	categoriesJSON().then((results) => {
		categories = results;
		return typesJSON();
		}).then((results2) => {
		types = results2;
		return productsJSON();	
		}).then((results3) => {
		results3.forEach((product) => {
			products.push(product);
		});
		let finishedProducts = smooshData(types, categories, products);
		console.log("products", finishedProducts);
		// pass finishedProducts into dom function here
		dom(finishedProducts);
	});

};


// first add category info to types array
// then add types to products array
const smooshData = (types, categories, products) => {
	let productArray = [];
	let productKeys = Object.keys(products[0]);
	console.log(productKeys);
	categories.forEach((category) => {
			console.log("something");
		types.forEach((type) => {
			if(category.id === type.category){
			type.categoryName = category.name;
			}	
		});
	});
	productKeys.forEach((product) => {
		let newProduct = {};
		console.log(products[0][product].type);
		types.forEach((type) => {
			if(products[0][product].type === type.id){
				newProduct.categoryName = type.categoryName;
				newProduct.categoryId = type.category;
				newProduct.typeName = type.name;
				newProduct.typeDescription = type.description;
				newProduct.name = products[0][product].name;
				newProduct.description = products[0][product].description;
			}	
		});
		productArray.push(newProduct);
	});
	return productArray;
};



// const makeDinos = () => {
// 	dinosaurs.forEach(function(dino){
// 		dom(dino);
// 	});
// };

const initializer = () => {
	dataGetter();
};

const getCategories = () => {
	return categories;
};

const getTypes = () => {
	return types;
};

const getProducts = () => {
	return products;
};

module.exports = {initializer: initializer, getCategories: categories, getTypes: types, getProducts: products};







},{"./dom.js":2}],2:[function(require,module,exports){
"use strict";

const domString = (products) => {
	let productString = '';
	for(let i = 0; i < products.length; i++) {
		let productCard = '';
		if(i%3 === 0){
			productCard += `<div class="row" id="cardRow">`;
		}
		productCard += `<card class="col-md-3 col-md-offset-1 boxShaddow category-${products[i].categoryId}" id="productCard">
							<h3> ${products[i].name} </h3>
							<h4> ${products[i].categoryName} </h4>
							<h5> ${products[i].description} </h5>
					   </card>`;
		if(i%3 === 2){
			productCard += `</div>`;
		}
		productString += productCard;
	}
	printToDom(productString);
};

const printToDom = (strang) => {
	$('#products').html(strang);
};

module.exports = domString;
},{}],3:[function(require,module,exports){
"use strict";

const products = require('./data');

$('#ground').click((event) => {
	displayGround();
});

const displayGround = () => {
	$('.category-0').addClass('hidden');
	$('.category-1').removeClass('hidden');
};

$('#aerial').click((event) => {
	displayAerial();
});

const displayAerial = () => {
	$('.category-1').addClass('hidden');
	$('.category-0').removeClass('hidden');
};

$('#all').click((event) => {
	displayAll();
});

const displayAll = () => {
	$('.category-1').removeClass('hidden');
	$('.category-0').removeClass('hidden');
};

module.exports = {};
},{"./data":1}],4:[function(require,module,exports){
"use strict";

const data = require("./data.js");
const events = require("./events");

$(document).ready(function() {
	data.initializer();
});

},{"./data.js":1,"./events":3}]},{},[4]);
