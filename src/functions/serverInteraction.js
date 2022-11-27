const urlServer = import.meta.env.VITE_APP_SERVER_URL;
const urlOrigin = import.meta.env.VITE_APP_ORIGIN_URL;

export const serverInteraction = async (url, method, body, authorization) => {
	let headersList;
	let httpOptions;
	let response;

	if (authorization) {
		headersList = {
			Accept: '*/*',
			'Access-Control-Allow-Origin': urlOrigin,
			'Content-Type': 'application/json',
			Authorization: authorization,
		};
	} else {
		headersList = {
			Accept: '*/*',
			'Access-Control-Allow-Origin': urlOrigin,
			'Content-Type': 'application/json',
		};
	}

	if (method === 'GET') {
		httpOptions = {
			method: method,
			headers: headersList,
		};
	} else {
		httpOptions = {
			method: method,
			headers: headersList,
			body: body,
		};
	}

	response = await fetch(urlServer + url, httpOptions);
	return response;
};

export const serverResponseHandler = async (response, type) => {
	if (type === 'text') return await response.text();
	if (type === 'json') return await response.json();
};