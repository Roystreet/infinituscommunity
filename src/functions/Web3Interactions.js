import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

/**Descripcion: Solicita la conexion de la cuenta de metamask
 *Entradas: N/A
 *Retorna: N/A
 */
export const setAddress = async (/* setIsModal */) => {
	const accounts = await provider.send("eth_requestAccounts", []);
	localStorage.setItem("address", accounts[0]);
};

/**Descripcion: Firma Mensajes del usuario
 *Entradas: N/A
 *Retorna: Un objeto con: (signedMessage) el mensaje firmado,
 * (message) el texto que se firmo y (address) la direccion del firmante
 */
export const signMessage = async () => {
	//obtenemos el firmante, el nonce de la cuenta y firmamos el mensaje
	const signer = provider.getSigner(localStorage.getItem("address"));
	const message = `Nonce: ${await signer.getTransactionCount("latest")}`;
	const signedMessage = await signer.signMessage(message);
	const SignedInfo = { address: localStorage.getItem("address"), message, signedMessage };
	return SignedInfo;
};

/**Descripcion: Envia Transacciones a la red.
 *Entradas: contractAddress = direccion del contrato a interactuar,
 *abi = abi del contracto a interactuar,
 *functionName = nombre de la funcion a llamar del contrato,
 *params: parametros en un arreglo ordenados segun los parametros de entrada de la funcion
 *Retorna: Un objeto TrxResponse, contiene el Hash de la transaccion y datos adicionales.
 */
export const sendWriteTransactions = async (contractAddress, abi, functionName, params) => {
	const signer = provider.getSigner(localStorage.getItem("address"));
	const ethersInterface = new ethers.utils.Interface(abi);
	const encodedFunction = ethersInterface.encodeFunctionData(functionName, params);
	const TrxResponse = await signer.sendTransaction({ to: contractAddress, data: encodedFunction });
	return TrxResponse;
};

/*Descripcion: Envia llamadas a funciones estaticas o getters.
 *Entradas: contractAddress = direccion del contrato a interactuar,
 *abi = abi del contracto a interactuar,
 *functionName = nombre de la funcion a llamar del contrato,
 *params: parametro (Actualmente admite uno)
 *decimals: decimales en caso de que el valor a retornar sea un numero(puede dejarse vacio)
 *Retorna: Un valor dependiendo de la funcion a llamar
 */
export const nonWriteContractFunctions = async (contractAddress, abi, functionName, params, decimals) => {
	const Contract = new ethers.Contract(contractAddress, abi, provider);
	const TrxResponse = await contractCalls(Contract, functionName, params, decimals);
	return TrxResponse;
};

/*Descripcion: Realiza el call a la funcion estatica o getters.
 *Entradas: Contract = objeto contrato que contiene la funcion,
 *functionName = nombre de la funcion a llamar del contrato,
 *params: parametro (Actualmente admite uno),
 *decimals: decimales en caso de que el valor a retornar sea un numero(puede dejarse vacio)
 *Retorna: Un valor dependiendo de la funcion a llamar
 */
const contractCalls = async (Contract, functionName, params, decimals = 0) => {
	let response;
	let outputValue;
	switch (functionName) {
		case "name":
			response = await Contract.name();
			break;
		case "symbol":
			response = await Contract.symbol();
			break;
		case "balanceOf":
			response = await Contract.balanceOf(params);
			break;
		case "decimals":
			response = await Contract.decimals();
			break;
		case "totalSupply":
			response = await Contract.totalSupply();
			break;
		case "_TreasuryPercentage":
			response = await Contract._TreasuryPercentage();
			break;
		case "_TreasuryAmount":
			response = await Contract._TreasuryAmount();
			break;
	}
	if (response._isBigNumber == true) {
		outputValue = ethers.utils.formatUnits(response, decimals);
	} else outputValue = response;
	return outputValue;
};
