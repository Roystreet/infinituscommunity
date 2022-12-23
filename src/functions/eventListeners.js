/**Descripcion: Inicia la escucha de eventos de cambio de cuenta y de cambio de red
 *Entradas: N/A
 *Retorna: N/A
 */
export const activateEventListeners = (setOpen, setMessage) => {
	window.ethereum.on("accountsChanged", (accounts) => {
		if (accounts.length === 0) {
			setOpen(true);
			setMessage({ tittle: "Notificacion", message: "Conecta alguna cuenta de Metamask" });
		} else {
			setOpen(true);
			setMessage({ tittle: "Notificacion", message: "Se cambio la cuenta conectada, vuelve a hacer Login" });
		}
	});

	window.ethereum.on("chainChanged", () => {
		if (window.ethereum.chainId != "0x38" && window.ethereum.networkVersion != "1") {
			setOpen(true);
			setMessage({ tittle: "Notificacion", message: "Se cambio la Red, vuelve a la Red BSC y vuelve a hacer Login" });
		}
	});
};

/**Descripcion: Descativa todas las escuchas de eventos activas
 *Entradas: N/A
 *Retorna: N/A
 */
export const deactivateEventListeners = () => {
	window.ethereum.removeAllListeners();
};
