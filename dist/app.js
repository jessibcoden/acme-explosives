(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let dom = require("./dom.js");

let categories = [];
let types = [];
let products = [];

var categoriesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./data/categories.json').done((data1) => {
			console.log("cats", data1);
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
		// makeDinos();
	});
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

},{}],3:[function(require,module,exports){
"use strict";

const data = require("./data.js");

$(document).ready(function() {
	data.initializer();
});

},{"./data.js":1}]},{},[3]);
