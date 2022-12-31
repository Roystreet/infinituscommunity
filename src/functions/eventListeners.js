import { clearUnusedProcess } from "./clearUnusedProcess";

/**Descripcion: Inicia la escucha de eventos de cambio de cuenta
 *@Desc Entradas:
 	@param {*} setOpen - useState para setear la apaertura del modal
 	@param {*} setMessage - useState para setear el mensaje a desplegar al usuario
	@param {*} setExitRoute - useState para setear la ruta de salida
	@param {*} setUserLogged - useState para setear el estatus de logeado del usuario
 *@Desc Retorna: N/A
 */
export const ListenerAccountChanged = (setOpen, setMessage, setExitRoute, setUserLogged, setUserJWT) => {
	window.ethereum.on("accountsChanged", (accounts) => {
		if (accounts.length === 0) {
			setOpen(true);
			setExitRoute("/");
			setUserLogged(false);
			setUserJWT(false);
			clearUnusedProcess();
			setMessage({ tittle: "Notificacion", message: "Conecta alguna cuenta de Metamask" });
		} else {
			setOpen(true);
			setExitRoute("/");
			setUserLogged(false);
			setUserJWT(false);
			clearUnusedProcess();
			setMessage({ tittle: "Notificacion", message: "Se cambio la cuenta conectada, vuelve a hacer Login" });
		}
	});
};

/**Descripcion: Inicia la escucha de eventos de cambio de cambio de red
 *@Desc Entradas:
 	@param {*} setOpen - useState para setear la apaertura del modal
 	@param {*} setMessage - useState para setear el mensaje a desplegar al usuario
 *@Desc Retorna: N/A
 */
export const ListenerNetworkChanged = (setOpen, setMessage) => {
	window.ethereum.on("chainChanged", () => {
		if (window.ethereum.chainId != "0x38" && window.ethereum.networkVersion != "1") {
			setOpen(true);
			setMessage({ tittle: "Notificacion", message: "Vuelve a la Red BSC" });
		}
	});
};

/**Descripcion: Inicia la escucha de eventos de cambio de cambio de red
 *@Desc Entradas: N/A
 *@Desc Retorna: N/A
 */
export const deactivateEventListeners = () => {
	window.ethereum.removeAllListeners();
};
