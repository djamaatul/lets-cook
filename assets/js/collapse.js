const collapse = document.querySelector('.collapse');
const button = document.querySelector('#header-button');
const aside = document.querySelector('aside');
const content = document.querySelector('#content');

const focusing = localStorage.getItem('--aside-collapse');
button.dataset.focus = focusing;

const renderAside = (open) => {
	if(open){
		content.style.flexBasis = '70%';
		aside.style.flexBasis = '30%';
		aside.style.maxHeight = '200vh';
	} else {
		aside.style.maxHeight = '0px';
		content.style.flexBasis = '100%';
		aside.style.flexBasis = '0%';
	}
}

renderAside(focusing === 'false' || !focusing)

collapse.addEventListener('click',() => {
	
	const content = document.querySelector('.collapse-container figure');
	const unseted = content.style.maxHeight === '99rem';
	
	content.style.maxHeight = unseted ? '0rem' : '99rem'
	content.style.paddingTop = unseted ? '0px' : '1rem';
	if(unseted){
		collapse.lastChild.classList.remove('fa-chevron-up');
		collapse.lastChild.classList.add('fa-chevron-down');
	} else {
		collapse.lastChild.classList.remove('fa-chevron-down');
		collapse.lastChild.classList.add('fa-chevron-up');
	}
})

button.onclick = () => {
	let focus = button.dataset.focus === 'true';
	focus = focus || (typeof button.dataset.focus === 'undefined' && window.innerWidth <= 1024)
	localStorage.setItem('--aside-collapse', !focus)
	renderAside(focus)
	button.dataset.focus = focus ? false : true
}