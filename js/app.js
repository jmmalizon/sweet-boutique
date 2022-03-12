import fromShop from './shop.js';

let anim = anime.timeline({
	easing: 'easeOutExpo',
	duration: 750,
});

anim.add({
	targets: '.anim div',
	width: '100%',
	backgroundColor: 'rgba(120, 219, 223, 0.623)',
	delay: anime.stagger(100),
});
anim.add(
	{
		targets: '.anim div i',
		opacity: 1,
	},
	'-=2000'
);

anim.add({
	targets: '.anim div',
	width: '50%',
	opacity: 0.5,
});
anim.add({
	targets: '.anim div',
	width: '0%',
	opacity: 0,
});

anim.add(
	{
		targets: '.secOne',
		height: '0vh',
	},
	'-=1500'
);
anim.add(
	{
		targets: '.secOne',
		opacity: 0,
	},
	'-=500'
);

anim.add(
	{
		targets: '.navbar',
		backgroundColor: '#23232e',
		zIndex: 10,
	},
	'-=2000'
);
anim.add(
	{
		targets: 'main',
		paddingLeft: '5rem',
		zIndex: '5',
	},
	'-=2000'
);

fromShop();
