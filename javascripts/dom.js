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