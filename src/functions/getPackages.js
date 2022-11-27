import { serverInteraction, serverResponseHandler } from './serverInteraction';

const getPackages = async account => {
	const url = '/user/getpackages';
	const response = await serverInteraction(
		url,
		'POST',
		JSON.stringify({
			address: account,
		}),
		localStorage.getItem('jwt')
	);
	const packages = await serverResponseHandler(response, 'json');

	return packages;
};

export default getPackages;