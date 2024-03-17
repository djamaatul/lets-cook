const handleSearch = ({ value }, e) => {
	const key = e.keyCode || e.which;
	if (key === 13) {
		window.open(`/?s=${value}`, '__self');
	}
};