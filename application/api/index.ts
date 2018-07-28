const URL = "https://api.github.com";

interface Parameters {
	[name: string]: any;
}

async function request(resource: string, parameters: Parameters = {}) {
	const query = Object.entries(parameters).map(([name, value]) => `${name}=${value}`).join("&");
	const response = await fetch(`${URL}/${resource}?${query}`);

	if (response.status === 404) {
		throw {message: "User not found"};
	}

	if (response.status > 500) {
		throw {message: "Server error"};
	}

	if (response.status > 400) {
		throw {message: "Something went wrong"};
	}

	return await response.json();
}

export async function getUserByName(name: string) {
	return await request(`users/${name}`);
}

export async function getReposByName(name: string) {
	return await request(`users/${name}/repos`);
}

export async function getGistsByName(name: string) {
	return await request(`users/${name}/gists`);
}
