const handleSearch = ({ value }, e) => {
	let base = '';
	if(location.host === 'djamaatul.github.io'){
		base = 'https://djamaatul.github.io/lets-cook/'
	}
	const key = e.keyCode || e.which;
	if (key === 13) {
		window.open(`/?s=${value}`, '_self');
	}
};