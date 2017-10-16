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






