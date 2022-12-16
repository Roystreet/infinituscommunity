// const urlServer = import.meta.env.VITE_APP_SERVER_URL;
// const urlOrigin = import.meta.env.VITE_APP_ORIGIN_URL;
const urlServer = 'http://localhost:3001';
const urlOrigin = 'http://127.0.0.1:5173';

// console.log('URLS', urlServer, urlOrigin)+

/**Descripcion: Recibe la informacion para realizar la llamada Fetch al servidor y manejar el resultado
 * Entradas:
 * params: objeto con las propiedades para la llamada
 * route: ruta del servidor,
 * output: tipo de salida deseada ('text' o 'json')
 * jwt: JSON Web Token, en caso de ser una llamada de autenticacion omitir este parametro
 * Retorna: Respuesta del servidor
 */
export const prepareServerConnection = async (params, route, output, jwt = undefined) => {
	const response = await ServerConnection(route, "POST", JSON.stringify(params), jwt);
	if (response.status == 401) {
		// console.log('Response ServerConnection', response)
		const LogErrorUserNotRegister = {userNotRegister: true}
		return LogErrorUserNotRegister
	} else if (response.status === 404 || response.status === 500) {
		const RegisterErrorStatus = {error: true}
		return RegisterErrorStatus
	}else {
		const responseHanded = await ServerResponseHandler(response, output);
		
		return responseHanded;
	}
};

/*Descripcion: Interactua con las rutas de informacion base para contratos
 *Entradas:
 *route: ruta del servidor,
 *output: tipo de salida deseada ('text' o 'json')
 *Retorna: Respuesta del servidor
 */
export const getContractData = async (route, output) => {
	const response = await ServerConnection(route, "GET", undefined, undefined);
	const responseHanded = await ServerResponseHandler(response, output);
	return responseHanded;
};

/*Descripcion: Realiza el fetch al servidor
 *Entradas:
 *url: ruta del servidor,
 *method: tipo de ruta 'GET' o 'POST'
 *body: cuerpo del mensaje en caso de ser un POST
 *authorization: jwt
 *Retorna: Respuesta del servidor
 */
const ServerConnection = async (url, method, body, authorization) => {
	let headersList;
	let httpOptions;
	let response;

	if (authorization) {
		headersList = {
			Accept: "*/*",
			"Access-Control-Allow-Origin": urlOrigin,
			"Content-Type": "application/json",
			Authorization: authorization,
		};
	} else {
		headersList = {
			Accept: "*/*",
			"Access-Control-Allow-Origin": urlOrigin,
			"Content-Type": "application/json",
		};
	}

	if (method === "GET") {
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

/*Descripcion: transforma la respuesta del servidor en un formato legible.
 *Entradas:
 *response: respuesta del servidor,
 *type: tipo de formato 'text' o 'json'
 *Retorna: Respuesta del servidor en formato legible
 */
const ServerResponseHandler = async (response, type) => {
	if (type === "text") return await response.text();
	if (type === "json") return await response.json();
};
