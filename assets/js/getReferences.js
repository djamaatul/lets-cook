(async () => {
	const flags = await (await fetch('/assets/data/flags.json')).json();

	const origin = await (await fetch(`https://themealdb.com/api/json/v1/1/list.php?a=list`)).json();

	document.getElementById('areas').innerHTML = origin.meals.map(item => {
		const color = `${generateNumber()},${generateNumber()},${generateNumber()}`;
		return `
		<a href="/pages/filter.html?a=${item.strArea}" class="tag flag" style="background-color: rgba(${color},1)">
			<img src="https://www.themealdb.com/images/icons/flags/big/64/${flags[item.strArea]}.png" alt="" />
			<span>${item.strArea}</span>
		</a>`;
	}).join('');

	const categories = await (await fetch(`https://themealdb.com/api/json/v1/1/list.php?c=list`)).json();

	document.getElementById('categories').innerHTML = categories.meals.map(item => {
		const color = `${generateNumber()},${generateNumber()},${generateNumber()}`;
		return `<a href="/pages/filter.html?c=${item.strCategory}" class="tag" style="background-color: rgba(${color},1);color: white">${item.strCategory}</a>`;
	}).join('');
})();