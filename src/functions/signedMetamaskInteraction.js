import Web3 from 'web3';
import { serverRequest, serverResponseHandler } from './serverInteractions.js';

export default async function signedMetamaskInteraction(account, provider, url, respHandler, type = undefined) {
	const web3 = new Web3(provider);
	const nonce = `Nonce: ${await web3.eth.getTransactionCount(account, 'latest')}`;

	const signedMessage = await web3.eth.personal.sign(nonce, account);

	const body = JSON.stringify({
		address: account,
		signedMessage,
		message: nonce,
	});

	let response = await serverRequest(url, 'POST', body, undefined);

	if (respHandler || type) {
		response = await serverResponseHandler(response, type);
	}

	return response;
}