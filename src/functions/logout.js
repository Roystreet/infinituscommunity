import rightButtons from '#Templates/rightButtons.template.js';
import hideButton from './hideButton.js';
import showButton from './showButtons.js';

const logout = setChangedButtons => {
	let changedButtons = [];

	///Incluir aqui logica de negocio
	localStorage.removeItem('jwt');

	changedButtons = showButton(rightButtons, 3);
	changedButtons = hideButton(changedButtons, 4);
	changedButtons = hideButton(changedButtons, 5);

	setChangedButtons(changedButtons);
};

export default logout;