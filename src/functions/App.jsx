import {
	connectAddress,
	nonWriteContractFunctions,
	sendWriteTransactions,
	signMessage,
} from '../functions/Web3Interactions';
import { getContractData, prepareServerConnection } from '../functions/ServerInteractions';
import { useState } from 'react';
import { activateEventListeners, deactivateEventListeners } from '../functions/eventListeners';
import { useEffect } from 'react';

function App() {
	const [balanceBUSD, setbalanceBUSD] = useState('');
	const [balanceINFI, setbalanceINFI] = useState('');
	const [responseRegister, setResponseRegister] = useState('');
	const [myTickets, setmyTickets] = useState([]);
	const [packagesId, setpackagesId] = useState([]);
	const [myInfo, setmyInfo] = useState([]);
	const [myNickname, setmyNickname] = useState();
	const [ticketSendedResponse, setTicketSendedResponse] = useState('');

	const checkMetamaskInstalled = () => {
		if (window.ethereum) {
			activateEventListeners;
		} else {
			window.alert('Instala metamask');
		}
	};

	useEffect(() => {
		checkMetamaskInstalled();
		return () => {
			// Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
			deactivateEventListeners();
		};
	}, [responseRegister]);

	return (
		<>
			<h1>Prueba de funcionalidades del servicio:</h1>
			<br />
			<button
				onClick={async () => {
					await connectAddress();
					const SignedInfo = await signMessage();
					setResponseRegister(await prepareServerConnection(SignedInfo, '/auth/register', 'text'));
				}}
			>
				Register With Metamask
			</button>
			<br />
			<button
				onClick={async () => {
					await connectAddress();
					const SignedInfo = await signMessage();
					const jwt = await prepareServerConnection(SignedInfo, '/auth/login', 'json');
					localStorage.setItem('jwt', jwt.jwt);
					setResponseRegister(`Usuario logeado con la address: ${localStorage.getItem('address')}`);
				}}
			>
				Login With Metamask
			</button>
			<h4>{responseRegister}</h4>
			<br />
			<h2>Balances</h2>
			<br />
			<button
				onClick={async () =>
					setbalanceBUSD(
						await nonWriteContractFunctions(
							await getContractData('/addressCoin', 'text'),
							await getContractData('/abiCoin', 'json'),
							'balanceOf',
							localStorage.getItem('address'),
							18
						)
					)
				}
			>
				Balance BUSD
			</button>
			<h4>{balanceBUSD}</h4>
			<br />
			<button
				onClick={async () =>
					setbalanceINFI(
						await nonWriteContractFunctions(
							await getContractData('/addressContract', 'text'),
							await getContractData('/abiContract', 'json'),
							'balanceOf',
							localStorage.getItem('address'),
							18
						)
					)
				}
			>
				Balance INFINITUS
			</button>
			<h4>{balanceINFI}</h4>
			<br />
			<button
				onClick={async () => {
					await sendWriteTransactions(
						await getContractData('/addressCoin', 'text'),
						await getContractData('/abiCoin', 'json'),
						'approve',
						[await getContractData('/addressContract', 'text'), '37500000000000000000']
					).then(async response => {
						console.log(response);
						await sendWriteTransactions(
							await getContractData('/addressContract', 'text'),
							await getContractData('/abiContract', 'json'),
							'buyTicketFather',
							[[3, 1]]
						).then(response => {
							console.log(response);
						});
					});
				}}
			>
				Compra Ticket Presale
			</button>
			<br />
			<br />
			<button
				onClick={async () => {
					await sendWriteTransactions(
						await getContractData('/addressCoin', 'text'),
						await getContractData('/abiCoin', 'json'),
						'approve',
						[await getContractData('/addressContract', 'text'), '25000000000000000000']
					).then(async response => {
						console.log(response);
						await sendWriteTransactions(
							await getContractData('/addressContract', 'text'),
							await getContractData('/abiContract', 'json'),
							'buyTicketSon',
							[1, 3, '0x570f2f1154023dCEc6FB9Ca14910326d00350a7a', true]
						).then(response => {
							console.log(response);
						});
					});
				}}
			>
				Compra Ticket Referido
			</button>
			<br />
			<br />
			<button
				onClick={async () => {
					await sendWriteTransactions(
						await getContractData('/addressContract', 'text'),
						await getContractData('/abiContract', 'json'),
						'collectTickets',
						[[1, 2, 3]]
					).then(response => {
						console.log(response);
					});
				}}
			>
				Recolectar Tickets
			</button>
			<br />
			<br />
			<button
				onClick={async () => {
					await sendWriteTransactions(
						await getContractData('/addressContract', 'text'),
						await getContractData('/abiContract', 'json'),
						'withdraw',
						['100000000000000000000']
					).then(response => {
						console.log(response);
					});
				}}
			>
				Retirar
			</button>
			<br />
			<br />
			<button
				onClick={async () => {
					await sendWriteTransactions(
						await getContractData('/addressContract', 'text'),
						await getContractData('/abiContract', 'json'),
						'withdrawInverstorsWinings',
						[1]
					).then(response => {
						console.log(response);
					});
				}}
			>
				Retirar Ganancias Inversor
			</button>
			<br />
			<br />
			<button
				onClick={async () => {
					setmyTickets(
						await prepareServerConnection(
							{ address: localStorage.getItem('address') },
							'/user/getmytickets',
							'text',
							localStorage.getItem('jwt')
						)
					);
				}}
			>
				Obtener mis tickets
			</button>
			<h4>{myTickets}</h4>
			<br />
			<br />
			<button
				onClick={async () => {
					await sendWriteTransactions(
						await getContractData('/addressContract', 'text'),
						await getContractData('/abiContract', 'json'),
						'changeTicketOwner',
						[4, '0x1847C28831a318bBE1Ae0Af2a827AdC122e5A33E'] //<===falta direccion
					).then(response => {
						console.log(response);
						setTicketSendedResponse('Ticket Enviado Exitosamente!');
					});
				}}
			>
				Enviar Ticket
			</button>
			<h4>{ticketSendedResponse}</h4>
			<br />
			<br />
			<button
				onClick={async () => {
					setpackagesId(
						await prepareServerConnection(
							{ address: localStorage.getItem('address') },
							'/user/getPackagesId',
							'text',
							localStorage.getItem('jwt')
						)
					);
				}}
			>
				Obtener Id de Paquetes
			</button>
			<h4>{packagesId}</h4>
			<br />
			<br />
			<button
				onClick={async () => {
					setmyInfo(
						await prepareServerConnection(
							{ address: localStorage.getItem('address') },
							'/user/getmyinfo',
							'text',
							localStorage.getItem('jwt')
						)
					);
				}}
			>
				Obtener mi Informacion
			</button>
			<h4>{myInfo}</h4>
			<br />
			<br />
			<button
				onClick={async () => {
					setmyNickname(
						await prepareServerConnection(
							{
								address: localStorage.getItem('address'),
								oldNickName: 'user_2Am7yhHA-EKTgwf9VYLMI',
								newNickName: 'P4nch0B1lla2541',
							},
							'/user/changenickname',
							'text',
							localStorage.getItem('jwt')
						)
					);
				}}
			>
				Cambiar Nickname
			</button>
			<h4>{myNickname}</h4>
		</>
	);
}

export default App;
