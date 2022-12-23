import { deactivateEventListeners } from "./eventListeners";

/**Descripcion: Limpia el localStorage y desactiva los eventlisteners
 * Entradas: N/A
 * Retorna: N/A
 */
export const clearUnusedProcess = () => {
	localStorage.removeItem("jwt");
	localStorage.removeItem("address");
	deactivateEventListeners();
};
