const tx = Transifex.tx;
const t = Transifex.t;

tx.init({
	token: '1/bf7099e4a2a53390e93b05e7ef9cd616604ee285',
});

// t('Welcome to this localization demo site', {
// 	_key: 'title',
// });

// t(
// 	'Software localization is the process of adapting software to both the culture and language of an end user, from standards of measurement to video and graphic design. It involves not only translation, but also design and UX changes to make software look and feel natural to the target user.',
// 	{
// 		_key: 'description',
// 	}
// );

const defaultLocale = navigator.language.split('-')[0];

document.addEventListener('DOMContentLoaded', () => {
	setLocale(defaultLocale);
});

const switcher = document.getElementById('localization-switcher');
switcher.onchange = (e) => {
	setLocale(e.target.value);
};

const setLocale = (newLocale) => {
	tx.setCurrentLocale(newLocale)
		.then(() => {
			translatePage();
		})
		.catch((err) => console.log(err));
	document.documentElement.dir = direction(newLocale);
};

const direction = (locale) => {
	return locale === 'ar' ? 'rtl' : 'ltr';
};

const translatePage = () => {
	document.querySelectorAll('[localization-key]').forEach((element) => {
		let key = element.getAttribute('localization-key');
		let translation = t(key);
		if (translation === key) {
			console.log(`Translation not found for key: ${key}`);
			setLocale(defaultLocale);
		}
		element.innerText = translation;
	});
};
