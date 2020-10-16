![Angry Cart](https://raw.githubusercontent.com/rah-emil/angry-cart.js/master/app/img/header.png "Angry Cart")

# Angry Cart
[![GitHub license](https://img.shields.io/github/license/rah-emil/angry-cart.js)](https://github.com/rah-emil/angry-cart.js/blob/master/LICENSE)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-brightgreen "Open Source")

[**VIEW DEMO**](https://cdn.rah-emil.ru/angry-cart.js/demo/ "**СМОТРЕТЬ ДЕМО**") .

A plugin for creating a shopping cart in pure JavaScript. No additional plugins are required to work. Can be used with jQuery.

### What does the plugin do?
- Saving goods (in localStorage)
- Add / Remove goods
- Output of goods to preview
- Output of goods to the table
- Clear cart
- Counting the number of goods
- Calculation of the cost of goods

------------

### How to use?
`npm i angry-cart.js`
**or**
To work with the plugin, you need to connect only 1 file => [`angry-cart.min.js`](https://github.com/rah-emil/angry-cart.js/blob/master/app/js/angry-cart.min.js "`angry-cart.min.js`")

**1. Plugin initialization:** 
``` html
<div>
	Cart (<span id="cartCount">0</span>)<br/>
	Total: <span id="totalPrice">0</span>$
</div>

<script>
	/* Plugin initialization */
	let cart = new AngryCart({
		counter: '#cartCount', // Quantity output
		totalPrice: '#totalPrice' // Cost derivation
	});

	/* We write the function of withdrawing goods from the basket (optional, required angryCPR() ) */
	function angryCPR() {
		let myCart = JSON.parse(localStorage.getItem(angryCartKey)), // "angryCartKey" - cart key in localStorage (const)
			renderBlock = document.getElementById('cartPreview');

		/* Clearing the block before displaying */
		renderBlock.innerHTML = '';

		/* We withdraw products from the cart */
		Array.from(myCart).forEach( function(product) {
			renderBlock.insertAdjacentHTML('beforeEnd', `
				<div class="d-flex">
					<h5>
						${product.data.title} x ${product.quantity} - ${product.data.price}$
					</h5>
					<button onclick="cart.removeFromCart(${product.product_id})">x</button>
				</div>
			`);
		});
	}
</script>
```

**2. Add products:** 
``` html
<div class="product">
	<img src="banans.jpg" alt="">
	<h3>Bananas - 48.99$</h3>

	<button class="btn btn-sm btn-info mt-4" onclick="cart.addToCart(1, {title: 'Бананы', price: 48.99, image: 'banans.jpg'})">Add to cart</button>
</div>
<!-- /.product -->
```

**3. Ready!**
Now you can add your own styles or embed a plugin to your site. The basket is ready.
> **WARNING!** To get products from the database, you can refer to the `product_id` key from the product object in the cart.

