![Angry Cart](https://raw.githubusercontent.com/rah-emil/angry-cart.js/master/app/img/header.png "Angry Cart")

# Angry Cart
[![GitHub license](https://img.shields.io/github/license/rah-emil/angry-cart.js)](https://github.com/rah-emil/angry-cart.js/blob/master/LICENSE)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-brightgreen "Open Source")

[**СМОТРЕТЬ ДЕМО**](https://cdn.rah-emil.ru/angry-cart.js/demo/ "**СМОТРЕТЬ ДЕМО**") .

Плагин для создания корзины товаров на чистом JavaScript. Никакие дополнительные плагины для работы не потребуются. Допустимо использование вместе с jQuery.

### Что умеет плагин?
- Сохранение товаров (в localStorage)
- Добавление/Удаление товара
- Вывод товаров в предосмотр
- Вывод товаров в таблицу
- Очистка корзины
- Подсчёт количества товаров
- Подсчёт стоимости товаров

------------

### Как использовать?
`npm i angry-cart.js`
**или**
Для работы с плагином необходимо подключить всего 1 файл => [`angry-cart.min.js`](https://github.com/rah-emil/angry-cart.js/blob/master/app/js/angry-cart.min.js "`angry-cart.min.js`")

**1. Инициализируем плагин:** 
``` html
<div>
	Корзина (<span id="cartCount">0</span>)<br/>
	Сумма: <span id="totalPrice">0</span>₽
</div>

<script>
	/* Инициализируем плагин */
	let cart = new AngryCart({
		counter: '#cartCount', // Вывод количества
		totalPrice: '#totalPrice' // Вывод стоимости
	});

	/* Пишем функцию вывода товаров из корзины (опционально, обязательно angryCPR() ) */
	function angryCPR() {
		let myCart = JSON.parse(localStorage.getItem(angryCartKey)), // "angryCartKey" - ключ корзины в localStorage (const)
			renderBlock = document.getElementById('cartPreview');

		/* Очищаем блок перед выводом */
		renderBlock.innerHTML = '';

		/* Выводим товары из корзины */
		Array.from(myCart).forEach( function(product) {
			renderBlock.insertAdjacentHTML('beforeEnd', `
				<div class="d-flex">
					<h5>
						${product.data.title} x ${product.quantity} - ${product.data.price}₽
					</h5>
					<button onclick="cart.removeFromCart(${product.product_id})">x</button>
				</div>
			`);
		});
	}
</script>
```

**2. Добавляем товары:** 
``` html
<div class="product">
	<img src="banans.jpg" alt="">
	<h3>Бананы - 48.99 руб</h3>

	<button class="btn btn-sm btn-info mt-4" onclick="cart.addToCart(1, {title: 'Бананы', price: 48.99, image: 'banans.jpg'})">В корзину</button>
</div>
<!-- /.product -->
```

**3. Готово!**
Теперь вы можете добавлять свои стили или внедрять плагин на свой сайт. Корзина готова.
> **ВАЖНО!** Для получения товаров из базы дынных вы можете обращаться к ключу `product_id` из объекта товара в корзине.

