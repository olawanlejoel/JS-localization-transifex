const defaultLocale = navigator.language.split('-')[0];

let translations = {};

document.addEventListener('DOMContentLoaded', () => {
	setLocale(defaultLocale);
});

const switcher = document.getElementById('localization-switcher');
switcher.onchange = (e) => {
	setLocale(e.target.value);
};

const setLocale = async (newLocale) => {
	translations = await fetchTranslationsFor(newLocale);
	translatePage();

	document.documentElement.dir = direction(newLocale);
};

const direction = (locale) => {
	return locale === 'ar' ? 'rtl' : 'ltr';
};

async function fetchTranslationsFor(newLocale) {
	const response = await fetch(`lang/${newLocale}.json`);
	if (!response.ok) {
		console.log(`Could not fetch translations for locale ${newLocale}`);
	}
	return await response.json();
}

const translatePage = () => {
	document.querySelectorAll('[localization-key]').forEach((element) => {
		let key = element.getAttribute('localization-key');
		let translation = translations[key];
		element.innerText = translation;
	});
};
