const cardsContainer = document.getElementById('cards');
const page = document.getElementById('page');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pagination = document.getElementById('pagination');
const search = document.getElementById('search');

search.value = new URLSearchParams(location.search).get('s');

let start = 0;
let end = 10;
let data = [];

(async () => {
	const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php${location.search || '?s='}`);
	data = await response.json();
	data = data.meals;

	const render = () => {
		const currentPage = end / 10;
		const totalPage = Math.ceil(data.length/10);
		if(currentPage === totalPage){
			next.disabled = true
		}
		page.innerHTML = `
			<div class="pages">
				${
					[...Array(totalPage)].map((_, index)=> {
						return `
							<button type="button" class="page ${(index + 1) === currentPage ? 'page-active' : ''}">
								${index + 1}
							</button>
						`
					}).join('')
				}
			</div>
		`;
		
		const cards = data.slice(start, end).map(item => {
			let tags = '';
			if (item.strTags) {
				tags = item.strTags.split(',').map((item) => {
					return `<button type="button" class="tag">${item}</button>`;
				}).join('');
			}
			return `
				<a href="../../pages/detail.html?i=${item.idMeal}" class="card">
						<div class="description">
							<h4>${item.strMeal}</h4>
								<div class="tags">${tags}</div>
							<div class="intructions">
								${item.strInstructions}
							</div>
						</div>
						<img src="${item.strMealThumb}" alt="" />
				</a>
			`;
		}).join('');
		cardsContainer.innerHTML = cards;
	};
	if (data) {
		pagination.style.display = 'flex';
		render();
	} else {
		cardsContainer.innerHTML = `
			<div style="align-self: center">Not Found :(</div>
		`;
	}

	prev.onclick = () => {
		const to = start - 10;
		if (to < 10) {
			prev.disabled = true;
		}
		start = to;
		end = end - 10;
		next.disabled = false;
		render();
	};
	next.onclick = () => {
		const to = end + 10;
		if (to > data.length) {
			next.disabled = true;
		}
		start = start + 10;
		end = to;
		prev.disabled = false;
		render();
	};
})();