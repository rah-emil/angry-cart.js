/**
 * angry-cart.js 2.0.0
 * angry-cart.js - JavaScript shopping cart plugin
 * GitHub: https://github.com/rah-emil/angry-cart.js
 *
 * Copyright 2020 Rah Emil
 *
 * Released under the MIT License
 *
 * Released: August 18, 2020
 * Latest updates: August 19, 2020
 */


const angryCartKey = 'angry-cart';

class AngryCart {

	constructor(options) {
		this.$counter = document.querySelector(options.counter),
		this.$totalPrice = document.querySelectorAll(options.totalPrice),
		this.__init()
	}

	__init(){
		if( localStorage.getItem(angryCartKey) )
		{
			let angryCartData = JSON.parse(localStorage.getItem(angryCartKey));
			this.$counter.innerHTML = angryCartData.length;
			this.__save(angryCartData);
		}
		else
		{
			localStorage.setItem(angryCartKey, JSON.stringify([]));
		}
	}

	__save(angryCartData){
		localStorage.setItem(angryCartKey, JSON.stringify(angryCartData));
		this.__calcTotal();
		this.outputCart();
	}

	__calcTotal(){
		try
		{
			if(this.$totalPrice.length != 0){
				let angryCartData = JSON.parse( localStorage.getItem(angryCartKey) ),
					total = 0;

				Array.from(angryCartData ?? []).forEach( (product) => {
					let price = product.data.price,
						quantity = product.quantity;

					total += price * quantity;
				});

				Array.from(this.$totalPrice).forEach( (totalPrice) => {
					totalPrice.innerHTML = total.toFixed(2);
				});
			}
		}
		catch(error)
		{
			console.warn('No price for this item');
			localStorage.setItem(angryCartKey, JSON.stringify([]));
		}
	}

	outputCart(){
		try
		{
			angryCPR();
		}
		catch(error)
		{
			console.warn('Function angryCPR() is not defined');
		}
	}

	addToCart(product_id, data){
		let angryCartData = JSON.parse( localStorage.getItem(angryCartKey) ) ?? null,
			existingProducts = angryCartData.find(product => product.product_id === product_id);

		if( !existingProducts )
		{
			angryCartData.push({
				product_id: product_id,
				quantity: 1,
				data: data
			});
		}
		else
		{
			existingProducts.quantity++;
		}


		this.__save(angryCartData);
		this.$counter.innerHTML = angryCartData.length;
	}

	removeFromCart(product_id){
		let angryCartData = JSON.parse(localStorage.getItem(angryCartKey) ?? null),
			existingProducts = angryCartData.findIndex(product => product.product_id === product_id);

		angryCartData.splice( existingProducts, 1 );

		this.__save(angryCartData);
		this.$counter.innerHTML = angryCartData.length;
	}

	clearCart(){
		localStorage.setItem(angryCartKey, JSON.stringify([]));
		this.$counter.innerHTML = 0;
		this.__calcTotal();
		this.outputCart();
	}

}