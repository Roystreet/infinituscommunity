import { setAddress } from './Web3Interactions';

export const activateEventListeners = (/* setIsModal */) => {
	window.ethereum.on('connect', setAddress);
	window.ethereum.on('accountsChanged', () => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('address');
		//Afecta el modal para notificar que debe iniciar sesion nuevamente
		window.alert('Inicia sesion nuevamente');
	});
	window.ethereum.on('disconnect', () => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('address');
	});
};

export const deactivateEventListeners = (/* setIsModal */) => {
	window.ethereum.off('connect', setAddress);
	window.ethereum.off('accountsChanged', () => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('address');
		//Afecta el modal para notificar que debe iniciar sesion nuevamente
		window.alert('Inicia sesion nuevamente');
	});
	window.ethereum.off('disconnect', () => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('address');
	});
};
