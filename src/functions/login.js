import { ethers } from 'ethers';
import rightButtonsTemplate from '#Templates/rightButtons.template.js';
import hideButton from './hideButton.js';
import showButton from './showButtons.js';
import { serverInteraction, serverResponseHandler } from './serverInteraction.js';
import accountChangedEventListener from '../events/accountChanged.listener.js';

const provider = new ethers.providers.Web3Provider(window.ethereum);
let changedButtons = [];
let accounts;
let account;

const login = async (setRightButtons, setcurrentAccount) => {
	const changedButtons = await loginProcess();
	setRightButtons(changedButtons);
	setcurrentAccount(account);
	accountChangedEventListener(setRightButtons, setcurrentAccount);
};

export async function loginProcess() {
	//Inicializamos las variables
	accounts = await provider.send('eth_requestAccounts', []);
	account = accounts[0];
	//obtenemos el firmante, el nonce de la cuenta y firmamos el mensaje
	const signer = provider.getSigner(account);
	const nonce = `Nonce: ${await signer.getTransactionCount('latest')}`;
	let signedMessage = await signer.signMessage(nonce);

	//Interactuamos con el servidor para validar si la cuenta esta registrada en BD
	const responseCheck = await serverInteraction(
		'/auth/checkRegister',
		'POST',
		JSON.stringify({
			address: account,
			signedMessage,
			message: nonce,
		}),
		undefined
	);
	//Manejamos la respuesta
	const existUser = await serverResponseHandler(responseCheck, 'json');
	if (existUser == true) {
		//Hacemos login al servidor
		const responseLogin = await serverInteraction(
			'/auth/loginA',
			'POST',
			JSON.stringify({
				address: account,
				signedMessage,
				message: nonce,
			}),
			undefined
		);
		//Obtenemos el JWT de la respuesta del servidor y lo guardamos en el localStorage
		const jwt = await serverResponseHandler(responseLogin, 'json');
		localStorage.setItem('jwt', jwt.jwt);
	} else {
		//Registramos el usuario en BD
		const responseRegister = await serverInteraction(
			'/auth/registerA',
			'POST',
			JSON.stringify({
				address: account,
				signedMessage,
				message: nonce,
			}),
			undefined
		);

		//se puede cambiar a el uso de promise con then y catch(mejor eficiencia con errores)
		if (responseRegister.status === 200) {
			window.alert('Registro de Usuario Exitoso!');
			//Hacemos login si el usuario se registro correctamente
			const responseLogin = await serverInteraction(
				'/auth/loginA',
				'POST',
				JSON.stringify({
					address: account,
					signedMessage,
					message: nonce,
				}),
				undefined
			);
			//Obtenemos el JWT de la respuesta del servidor y lo guardamos en el localStorage
			const jwt = await serverResponseHandler(responseLogin, 'json');
			localStorage.setItem('jwt', jwt.jwt);
		} else {
			//Devolvemos el mensaje de error del servidor
			const message = await serverResponseHandler(responseRegister, 'text');
			window.alert(`Error: ${message}`);
			return rightButtonsTemplate;
		}
	}
	//Se modifican los botones y se devuelven para su cambio en el estado
	changedButtons = hideButton(rightButtonsTemplate, 3);
	changedButtons = showButton(changedButtons, 4);
	//changedButtons = showButton(changedButtons, 5);
	return changedButtons;
}

export default login;