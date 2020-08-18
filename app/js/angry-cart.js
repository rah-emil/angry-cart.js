const angryCartKey = 'angry-cart';

class AngryCart {

	constructor(options) {
		this.$counter = document.querySelector(options.counter),
		this.$cartPreview = document.querySelector(options.cartPreview),
		this.__init()
	}

	__render(angryCartData){
		this.$cartPreview.innerHTML = '';

		Array.from(angryCartData).forEach( (product) => {
			this.$cartPreview.insertAdjacentHTML('beforeEnd', `<h6>*Имя товара*</h6><span>id: ${product.product_id}, кол-во: ${product.quantity}</span><button class="btn btn-sm btn-danger" onclick="cart.removeFromCart(${product.product_id})">x</button><hr/>`);
		});
	}

	__init(){
		if( localStorage.getItem(angryCartKey) )
		{
			let angryCartData = JSON.parse(localStorage.getItem(angryCartKey)) ?? [];
			this.$counter.innerHTML = angryCartData.length;

			this.__render(angryCartData);
		}
		else
		{
			localStorage.setItem(angryCartKey, null);
		}
	}

	__save(angryCartData){
		localStorage.setItem(angryCartKey, JSON.stringify(angryCartData));
		console.log(angryCartData);
	}

	addToCart(product_id){
		let angryCartData = JSON.parse( localStorage.getItem(angryCartKey) ) ?? [],
			existingProducts = angryCartData.find(product => product.product_id === product_id);

		if( !existingProducts )
		{
			angryCartData.push({
				product_id: product_id,
				quantity: 1
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
		let angryCartData = JSON.parse(localStorage.getItem(angryCartKey)) ?? [],
			existingProducts = angryCartData.find(product => product.product_id === product_id);

		angryCartData.splice( existingProducts );

		console.log(angryCartData);

		this.__render(angryCartData);
	}

	clearCart(){
		localStorage.setItem(angryCartKey, null);
		this.$counter.innerHTML = 0;
		this.$cartPreview.innerHTML = '';
	}

	getCart(){
		console.log('Load products from cart');
	}

} 
