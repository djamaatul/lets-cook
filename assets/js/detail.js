const article = document.querySelector('#content article');

(async () => {
	const response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php${location.search}`)).json();

	const data = response.meals[0];

	if (!data) window.open('/', '__self');

	const gradients = [...Array(20)].flatMap((_, index) => {
		const measure = data[`strMeasure${index + 1}`] || '';
		const gradient = data[`strIngredient${index + 1}`] || '';
		if (!measure || !gradient) return [];
		return `<section class="gradient">
			<img src="https://www.themealdb.com/images/ingredients/${gradient}.png" alt="" />
			<span>${measure} <span>${gradient}</span></span>
		</section>`;
	}).join('');

	const tags = data.strTags?.split(',').map((item) => {
		return `<button type="button" class="tag">${item}</button>`;
	}).join('') || '';

	article.innerHTML = `
		<section class="article-title">
			<img src="${data.strMealThumb}" alt="">
			<h2><img src="https://www.themealdb.com/images/icons/flags/big/64/${flags[data.strArea]}.png" alt="" />${data.strMeal}</h2>
			<figure class="tags">
				${tags}
			</figure>
		</section>
		<section class="article-gradients">
			<h3>Bahan Bahan</h3>
			<figure>
				${gradients}
			</figure>
		</section>
		<section class="article-intruction">
			<p>${data.strInstructions}</p>
		</section>
	`;
})();