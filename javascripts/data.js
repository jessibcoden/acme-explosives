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
		let finishedProducts = smooshData();
		// pass finishedProducts into dom function here
	});
};


// first add category info to types array
// then add types to products array
const smooshData (types, categories, products) => {
	categories.forEach((category) => {
		types.forEach((type) => {
			if(category.id === type.category){
			type.categoryName = category.name;
			}	
		});
	});
	products.forEach((product) => {
		types.forEach((type) => {
			if(product.type === type.id){
			product.categoryName = type.categoryName;
			product.categoryId = type.category;
			product.typeName = type.name;
			product.typeDescription = type.description;
			}	
		});
	});
	return products;
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






