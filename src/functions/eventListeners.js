import { clearUnusedProcess } from "./clearUnusedProcess";

/**Descripcion: Inicia la escucha de eventos de cambio de cuenta
 *@Desc Entradas:
 	@param {*} setOpen - useState para setear la apaertura del modal
 	@param {*} setMessage - useState para setear el mensaje a desplegar al usuario
	@param {*} setExitRoute - useState para setear la ruta de salida
	@param {*} setUserLogged - useState para setear el estatus de logeado del usuario
	@param {*} setStatus - useState para setear el status del componente antD
	@param {*} setDisplayButton - useState para setear si el boton del modal estara deshabilitado 
 *@Desc Retorna: N/A
 */
export const ListenerAccountChanged = (setOpen, setMessage, setExitRoute, setUserLogged, setStatus, setDisplayButton) => {
	window.ethereum.on("accountsChanged", (accounts) => {
		if (accounts.length === 0) {
			setOpen(true);
			setExitRoute("/");
			setUserLogged(false);
			clearUnusedProcess();
			setDisplayButton("");
			setStatus("info");
			setMessage({ tittle: "Notification", message: "Please connect at least one Metamask account" });
		} else {
			setOpen(true);
			setExitRoute("/");
			setUserLogged(false);
			clearUnusedProcess();
			setDisplayButton("");
			setStatus("info");
			setMessage({ tittle: "Notification", message: "Connected account has changed, login again" });
		}
	});
};

/**Descripcion: Inicia la escucha de eventos de cambio de cambio de red
 *@Desc Entradas:
 	@param {*} setOpen - useState para setear la apaertura del modal
 	@param {*} setMessage - useState para setear el mensaje a desplegar al usuario
	@param {*} setDisplayButton - useState para setear si el boton del modal estara deshabilitado 
	@param {*} setStatus - useState para setear status del componente antD
 *@Desc Retorna: N/A
 */
export const ListenerNetworkChanged = (setOpen, setMessage, setDisplayButton, setStatus) => {
	window.ethereum.on("chainChanged", () => {
		if (window.ethereum.chainId != "0x38") {
			setOpen(true);
			setDisplayButton("none");
			setStatus("warning");
			setMessage({ tittle: "Notification", message: "Go Back to BSC Network" });
		} else setOpen(false);
	});
};

/**Descripcion: Inicia la escucha de eventos de cambio de cambio de red
 *@Desc Entradas: N/A
 *@Desc Retorna: N/A
 */
export const deactivateEventListeners = () => {
	window.ethereum.removeAllListeners();
};
