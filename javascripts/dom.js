"use strict";

const domString = (products) => {
	let productString = '';
	for(let i = 0; i < products.length; i++) {
		let productCard = '';
		productCard += `<card class="col">
							<h3> ${products[i].name} </h3>
							<h4> ${products[i].categoryName} <h4>
							<h5> ${products[i].description} <h5>
					   </card>`;

		productString += productCard;
	}
	printToDom(productString);
};

const printToDom = (strang) => {
	$('#products').html(strang);
};

module.exports = domString;