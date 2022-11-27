import { ethers } from 'ethers';
import { serverInteraction, serverResponseHandler } from '#Functions/serverInteraction.js';

let coinAddress;
let contractAddress;
const provider = new ethers.providers.Web3Provider(window.ethereum);

const buyFunction = async (key, packagesToBuy, account) => {
	const signer = provider.getSigner(account);
	const packages = [packagesToBuy[key]];
	const amountTransfer = new String(packages[0][0] * packages[0][1]);
	const amountTransferNumber = new Number(amountTransfer);
	await setContractsData();

	const responseBalance = await serverInteraction(
		'/user/mybalance',
		'POST',
		JSON.stringify({
			address: account,
		}),
		localStorage.getItem('jwt')
	);
	const userBalance = await serverResponseHandler(responseBalance, 'text');
	const userBalanceNumber = new Number(userBalance);

	if (userBalanceNumber >= amountTransferNumber) {
		const responseEncodeTrx = await serverInteraction(
			'/user/buyticket',
			'POST',
			JSON.stringify({
				address: account,
				packages,
				amountTransfer: amountTransfer.valueOf(),
			}),
			localStorage.getItem('jwt')
		);

		const { Approval, Buy } = await serverResponseHandler(responseEncodeTrx, 'json');

		//Approval
		await signer.sendTransaction({ to: coinAddress, data: Approval }).then(async tr => {
			console.log(tr);
			//Funcion de contrato Buy
			await signer
				.sendTransaction({
					to: contractAddress,
					data: Buy,
				})
				.then(async TransactionResponse => {
					console.log(TransactionResponse);
					//Crear Tickets
					const result = await serverInteraction(
						'/user/createtickets',
						'POST',
						JSON.stringify({
							address: account,
							packages,
							trxHash: TransactionResponse.hash,
							ticketOriginID: null,
							crOriginID: null,
						}),
						localStorage.getItem('jwt')
					);

					console.log(result);
				});
		});
	}
};

const setContractsData = async () => {
	const resp1 = await serverInteraction('/addressCoin', 'GET', undefined, undefined);
	coinAddress = await serverResponseHandler(resp1, 'text');

	const resp2 = await serverInteraction('/addressContract', 'GET', undefined, undefined);
	contractAddress = await serverResponseHandler(resp2, 'text');
};

export default buyFunction;