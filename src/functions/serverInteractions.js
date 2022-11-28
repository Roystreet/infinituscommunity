const urlServer = import.meta.env.VITE_APP_SERVER_URL;
const urlOrigin = import.meta.env.VITE_APP_ORIGIN_URL;

//Descripcion: Interactua con las rutas de autenticacion
//Entradas: SignedInfo,
//route: ruta del servidor,
//output: tipo de salida deseada ('text' o 'json')
//Retorna: Respuesta del servidor
export async function authServerInteraction(SignedInfo, route, output) {
	const response = await ServerConnection(
		'/auth' + route,
		'POST',
		JSON.stringify({
			address: SignedInfo.address,
			signedMessage: SignedInfo.signedMessage,
			message: SignedInfo.message,
		}),
		undefined
	);
	//Manejamos la respuesta
	const respToReturn = await ServerResponseHandler(response, output);
	return respToReturn;
}

//Descripcion: Interactua con la ruta de chequeo de authorize
//Entradas: ,
//address: direccion del usuario conectado,
//output: tipo de salida deseada ('text' o 'json')
//Retorna: Respuesta del servidor
export async function authCheckAuthorize(address, output) {
	const response = await ServerConnection(
		'/auth/checkauthorize',
		'POST',
		JSON.stringify({
			address,
		}),
		undefined
	);
	//Manejamos la respuesta
	const respToReturn = await ServerResponseHandler(response, output);
	return respToReturn;
}

//Descripcion: Interactua con las rutas de informacion base para contratos
//Entradas:
//route: ruta del servidor,
//output: tipo de salida deseada ('text' o 'json')
//Retorna: Respuesta del servidor
export const getContractData = async (route, output) => {
	const response = await ServerConnection(route, 'GET', undefined, undefined);
	const responseHanded = await ServerResponseHandler(response, output);
	return responseHanded;
};

//Descripcion: Interactua con las rutas de informacion de usuarios
//Entradas:
//address: direccion de wallet de usuario
//route: ruta del servidor,
//output: tipo de salida deseada ('text' o 'json')
//Retorna: Respuesta del servidor
export const userServerInteraction = async (address, route, output) => {
	const response = await ServerConnection(
		route,
		'POST',
		JSON.stringify({
			address,
		}),
		localStorage.getItem('jwt')
	);
	const responseHanded = await ServerResponseHandler(response, output);
	return responseHanded;
};

//Descripcion: Realiza el fetch al servidor
//Entradas:
//url: ruta del servidor,
//method: tipo de ruta 'GET' o 'POST'
//body: cuerpo del mensaje en caso de ser un POST
//authorization: jwt
//Retorna: Respuesta del servidor
const ServerConnection = async (url, method, body, authorization) => {
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

//Descripcion: transforma la respuesta del servidor en un formato legible.
//Entradas:
//response: respuesta del servidor,
//type: tipo de formato 'text' o 'json'
//Retorna: Respuesta del servidor en formato legible
const ServerResponseHandler = async (response, type) => {
	if (type === 'text') return await response.text();
	if (type === 'json') return await response.json();
};
