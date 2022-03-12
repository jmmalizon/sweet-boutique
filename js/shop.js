export default function fromShop() {
	//important
	if (document.readyState == 'loading') {
		document.addEventListener('DOMContentLoaded', ready);
	} else {
		ready();
	}

	function Cart() {
		const shopCart = document.querySelector('.shopCart');
		shopCart.addEventListener('click', openCart);

		const arrowCart = document.querySelector('#closeCart');
		arrowCart.addEventListener('click', closeCart);

		const allContainer = document.querySelector('.allContainer');
		allContainer.addEventListener('click', boutiqueSectionClicked);
	}
	Cart();

	function openCart() {
		const cart = document.querySelector('.cart');
		cart.style.transform = 'translate(0)';
		blurBackground();
	}

	function closeCart() {
		const cart = document.querySelector('#cart');
		cart.style.transform = 'translateX(100%)';
		unblurBackground();
	}

	function blurBackground() {
		const boutiqueSection = document.querySelector('.botique-section');
		const botiqueItem = document.querySelectorAll('.botique-item');

		for (let i = 0; i < botiqueItem.length; i++) {
			const item = botiqueItem[i];
			item.style.pointerEvents = 'none';
		}
		boutiqueSection.style.filter = 'blur(15px)';
	}

	function boutiqueSectionClicked() {
		unblurBackground();
		closeCart();
	}

	function unblurBackground() {
		const boutiqueSection = document.querySelector('.botique-section');
		const botiqueItem = document.querySelectorAll('.botique-item');

		for (let i = 0; i < botiqueItem.length; i++) {
			const item = botiqueItem[i];
			item.style.pointerEvents = 'auto';
		}
		boutiqueSection.style.filter = 'blur(0)';
	}

	function ready() {
		const cartItemClose = document.querySelectorAll('.btn-danger');
		for (let i = 0; i < cartItemClose.length; i++) {
			//get the actual button
			const button = cartItemClose[i];
			button.addEventListener('click', removeCartItem);
		}
		const quantityInputs = document.querySelectorAll('.cart-quantity-input');
		for (let i = 0; i < quantityInputs.length; i++) {
			//get the actual input
			const input = quantityInputs[i];
			input.addEventListener('change', quantityChanged);
		}
		const addToCartButtons = document.querySelectorAll('.add-cart');
		for (let i = 0; i < addToCartButtons.length; i++) {
			const button = addToCartButtons[i];
			button.addEventListener('click', addToCartClicked);
		}
		document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked);
		// updateCartNumber();
	}
	function purchaseClicked() {
		alertSuccess();
		const cartItems = document.querySelector('.cart-items');
		while (cartItems.hasChildNodes()) {
			cartItems.removeChild(cartItems.firstChild);
		}
		updateCartTotal();
	}

	function removeCartItem(e) {
		const buttonClicked = e.target;
		buttonClicked.parentElement.parentElement.remove();
		const addToCartButtons = document.querySelectorAll('.add-cart');
		for (let i = 0; i < addToCartButtons.length; i++) {
			const button = addToCartButtons[i];
			button.innerText = 'Add to cart';
		}
		updateCartTotal();
	}

	function quantityChanged(e) {
		const input = e.target;

		if (isNaN(input.value) || input.value <= 0) {
			input.value = 1;
		}
		updateCartTotal();
	}

	function addToCartClicked(e) {
		const button = e.target;
		button.innerText = 'In Cart';
		button.style.backgroundColor = ' orange';
		const shopItem = button.parentElement.parentElement.parentElement.parentElement;
		const title = shopItem.querySelectorAll('.item-title')[0].innerText;
		const price = shopItem.querySelectorAll('.item-price')[0].innerText;
		const imageSrc = shopItem.querySelectorAll('.title-image')[0].src;
		// console.log(title, price, imageSrc);
		addItemToCart(title, price, imageSrc);
		updateCartTotal();
		// updateCartNumber();
	}
	function addItemToCart(title, price, imageSrc) {
		const cartRow = document.createElement('div');
		cartRow.classList.add('cart-row');
		// console.log(cartRow);
		const cartItems = document.querySelector('.cart-items');
		const cartItemName = cartItems.querySelectorAll('.cart-item-title');
		// alert('item added to the cart');
		for (let i = 0; i < cartItemName.length; i++) {
			if (cartItemName[i].innerText == title) {
				alertNotSuccess();
				return;
			}
		}

		const cartRowContent = `
					<div class="cart-item cart-column">
						<img class="cart-item-image" src="${imageSrc}" width="60" height="60" />
						<span class="cart-item-title">${title}</span>
					</div>
					<span class="cart-price cart-column">${price}</span>
					<div class="cart-quantity cart-column">
						<input class="cart-quantity-input cart-column" type="number" value="1" />
						<button class="btn btn-danger"><i class="fas fa-times-circle"></i></button>
					</div>`;
		cartRow.innerHTML = cartRowContent;
		cartItems.append(cartRow);
		cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeCartItem);
		cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged);
		// alert('item added to cart');
	}

	// function updateCartNumber() {
	// 	const cartItemContainer = document.querySelector('.cart-items');
	// 	const cartRows = cartItemContainer.querySelectorAll('.cart-row');
	// 	const linkCart = document.querySelector('.link-cart');
	// 	linkCart.innerText = cartRows.length;

	// 	const btn = document.querySelectorAll('.btn-danger');
	// 	console.log(cartRows.length);
	// 	for (let i = 0; i < btn.length; i++) {
	// 		const button = btn[i];
	// 		button.addEventListener('click', function () {
	// 			linkCart.innerText = cartRows.length - 1;
	// 			console.log('click');
	// 		});
	// 	}

	// 	// console.log(linkCart.innerText);
	// }

	// function updateCartTotal() {
	// 	const total = [];

	// 	const prices = document.querySelectorAll('.item-price');
	// 	console.log(prices);
	// 	const quantityElement = document.querySelectorAll('.cart-quantity-input');
	// 	// const quantity = document.querySelectorAll('.cart-quantity-input');

	// 	prices.forEach((price) => {
	// 		total.push(parseFloat(price.textContent));
	// 	});

	// 	const quantity = quantityElement.value;
	// 	const totalPrice = total.reduce((total, item) => {
	// 		total += item;
	// 		return total;
	// 	}, 0);

	// 	const finalPrice = totalPrice.toFixed(2);
	// 	console.log(finalPrice);

	// 	document.querySelector('.cart-total-price').textContent = finalPrice;
	// 	document.querySelector('.link-cart').innerText = finalPrice.length;
	// }
	function updateCartTotal() {
		const cartItemContainer = document.querySelector('.cart-items');
		const cartRows = cartItemContainer.querySelectorAll('.cart-row');
		// console.log(cartRows.length);

		let total = 0;
		for (let i = 0; i < cartRows.length; i++) {
			const cartRow = cartRows[i];
			const priceElement = cartRow.querySelectorAll('.cart-price')[0];
			const quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0];

			let price = parseFloat(priceElement.innerText.replace('₱', ''));
			console.log(price);
			let quantity = quantityElement.value;
			// console.log(quantity);
			total += price * quantity;
			// priceElement.textContent = price * quantity;
		}
		//rounding 2 decimal places
		total = Math.round(total * 100) / 100;
		document.querySelector('.cart-total-price').innerText = '₱' + total + '.00';
	}

	function alertSuccess() {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: false,
		});

		Toast.fire({
			icon: 'info',
			title: 'Purchase Successful',
		});
	}
	function alertNotSuccess() {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: false,
		});

		Toast.fire({
			icon: 'warning',
			title: 'Item already added to the cart',
		});
	}
}
