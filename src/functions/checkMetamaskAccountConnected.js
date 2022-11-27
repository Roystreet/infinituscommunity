import { ethers } from 'ethers';
import { serverInteraction, serverResponseHandler } from './serverInteraction.js';
import rightButtons from '#Templates/rightButtons.template.js';
import hideButton from '#Functions/hideButton.js';
import showButton from '#Functions/showButtons.js';
import accountChangedEventListener from '../events/accountChanged.listener';

const Ethereum = window.ethereum;

const checkMetamaskConnectedAccount = async (currentAccount, setRightButtons, setcurrentAccount) => {
	if ((await checkJWT()) == true) {
		let changedButtons;
		const provider = new ethers.providers.Web3Provider(Ethereum);
		const accounts = await provider.send('eth_requestAccounts', []);

		if (accounts.length !== 0) {
			currentAccount = accounts[0];
			const responseCheck = await serverInteraction(
				'/user/checkauthorize',
				'POST',
				JSON.stringify({
					address: currentAccount,
				}),
				localStorage.getItem('jwt')
			);

			if (responseCheck.ok) {
				changedButtons = hideButton(rightButtons, 3);
				changedButtons = showButton(changedButtons, 4);
				//changedButtons = showButton(changedButtons, 5);
				setRightButtons(changedButtons);
				accountChangedEventListener(setRightButtons, setcurrentAccount);
				return currentAccount;
			} else {
				const message = await serverResponseHandler(responseCheck, 'text');
				window.alert(message);
				setRightButtons(rightButtons);
				return currentAccount;
			}
		} else {
			window.alert('Debes conectar tu cuenta de metamask');
			setRightButtons(rightButtons);
			return currentAccount;
		}
	} else {
		setRightButtons(rightButtons);
		return currentAccount;
	}
};

export default checkMetamaskConnectedAccount;

const checkJWT = async () => {
	if (localStorage.getItem('jwt') === null) {
		return false;
	} else {
		return true;
	}
};