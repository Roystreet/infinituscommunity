export const activateEventListeners = (/* setIsModal */) => {
	window.ethereum.on("accountsChanged", (accounts) => {
		if (accounts.length === 0) {
			localStorage.removeItem("jwt");
			localStorage.removeItem("address");
			//Afecta el modal para notificar que debe conectarse a metamask
			console.log("Conectate a Metamask");
		} else {
			localStorage.removeItem("jwt");
			localStorage.removeItem("address");
			//Afecta el modal para notificar que debe iniciar sesion nuevamente
			console.log("Cambio de cuenta");
		}
	});

	window.ethereum.on("chainChanged", () => {
		console.log("cambio de red");
		//Afecta el modal para notificar que debe devolver a la red BNB
	});
};

export const deactivateEventListeners = (/* setIsModal */) => {
	window.ethereum.off("accountsChanged", (accounts) => {
		if (accounts.length === 0) {
			localStorage.removeItem("jwt");
			localStorage.removeItem("address");
			//Afecta el modal para notificar que debe conectarse a metamask
			console.log("Conectate a Metamask");
		} else {
			localStorage.removeItem("jwt");
			localStorage.removeItem("address");
			//Afecta el modal para notificar que debe iniciar sesion nuevamente
			console.log("Cambio de cuenta");
		}
	});

	window.ethereum.off("chainChanged", () => {
		console.log("cambio de red");
		//Afecta el modal para notificar que debe devolver a la red BNB
	});
};
