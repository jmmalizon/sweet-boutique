//Back to homepage
// document.querySelector('#toHome').addEventListener('click', (e) => {
// 	e.preventDefault();
// 	window.close();
// });

export default function fromMain() {
	//OpenCart
	document.querySelector('.shopCart').addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector('#cart').style.width = '30%';
	});
	//CloseCart
	document.querySelector('#closeCart').addEventListener('click', (e) => {
		document.querySelector('#cart').style.width = '0%';
	});
	//
	let carts = document.querySelectorAll('.add-cart');

	let products = [
		{
			name: 'Candy 1',
			tag: 'candy1',
			price: 5,
			inCart: 0,
		},
		{
			name: 'Candy 2',
			tag: 'candy2',
			price: 10,
			inCart: 0,
		},
		{
			name: 'Candy 3',
			tag: 'candy3',
			price: 15,
			inCart: 0,
		},
		{
			name: 'Candy 4',
			tag: 'candy4',
			price: 20,
			inCart: 0,
		},
	];
	//loop through all the add to carts
	for (let i = 0; i < carts.length; i++) {
		carts[i].addEventListener('click', () => {
			cartNumbers(products[i]);
			totalCost(products[i]);
		});
	}
	//onload from local storage
	function onloadCartNumbers() {
		let productNumbers = localStorage.getItem('cartNumbers');

		if (productNumbers) {
			document.querySelector('.link-cart').textContent = productNumbers;
		}
	}
	//store in local storage
	function cartNumbers(product) {
		let productNumbers = localStorage.getItem('cartNumbers');

		productNumbers = parseInt(productNumbers);

		if (productNumbers) {
			localStorage.setItem('cartNumbers', productNumbers + 1);
			document.querySelector('.link-cart').textContent = productNumbers + 1;
		} else {
			localStorage.setItem('cartNumbers', 1);
			document.querySelector('.link-cart').textContent = 1;
		}
		if (productNumbers >= 99) {
			document.querySelector('.link-cart').textContent = `99+`;
		}

		setItems(product);
	}

	function setItems(product) {
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);

		if (cartItems != null) {
			//sets item only to one specific item so it will be undefined to click another

			// if undefined add to current cart items and the item clicked
			if (cartItems[product.tag] == undefined) {
				cartItems = {
					...cartItems,
					[product.tag]: product,
				};
			}
			// if there is something in the cart incart + 1
			cartItems[product.tag].inCart += 1;
		} else {
			//else set incart to 1
			product.inCart = 1;
			cartItems = {
				[product.tag]: product,
			};
		}

		localStorage.setItem('productsInCart', JSON.stringify(cartItems));
	}

	function totalCost(product) {
		// console.log(product.price);
		let cartCost = localStorage.getItem('totalCost');

		if (cartCost != null) {
			cartCost = parseInt(cartCost);
			localStorage.setItem('totalCost', cartCost + product.price);
		} else {
			localStorage.setItem('totalCost', product.price);
		}
	}

	function displayCart() {
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);

		let products = document.querySelector('.products');

		if (cartItems && products) {
			products.innerHTML = '';
			Object.values(cartItems).map((item) => {
				products.innerHTML += ` 
				<div class="product">
					<img src="/img/sample.jpg">
					
					<span>${item.name}</span>
				</div>
				`;
			});
		}
	}

	onloadCartNumbers();
	displayCart();
}
