(async () => {
	const data = await (await fetch('https://api.github.com/users/djamaatul')).json();

	if(!data.name) return;

	const profile = document.getElementById('profile-section');
	profile.innerHTML = `
		<img src="${data.avatar_url}" alt="" class="photo" />
		<a href="${data.url}">
			<h4 style="margin: 0px">${data.name}</h4>
		</a>
		<span style="color: grey; font-weight: lighter">${data.login}</span>
		<span><i class="fa-solid fa-users"></i> ${data.followers} follower . ${data.following} following</span>
	`
})()