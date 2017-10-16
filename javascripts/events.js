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