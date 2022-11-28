import { nonWriteContractFunctions, sendWriteTransactions, signMessage } from '../functions/Web3Interactions';
import {
	authServerInteraction,
	getContractData,
	userServerInteraction,
} from '../functions/ServerInteractions';
import { useState } from 'react';

function App() {
	const [balanceBUSD, setbalanceBUSD] = useState('');
	const [balanceINFI, setbalanceINFI] = useState('');
	const [responseRegister, setResponseRegister] = useState('');
	const [myTickets, setmyTickets] = useState([]);
	const [packagesId, setpackagesId] = useState([]);
	const [myInfo, setmyInfo] = useState([]);
	return (
		<>
			<h1>Prueba de funcionalidades del servicio:</h1>
			<br />
			<button
				onClick={async () => {
					const SignedInfo = await signMessage();
					setResponseRegister(await authServerInteraction(SignedInfo, '/register', 'text'));
					localStorage.setItem('address', SignedInfo.address);
					localStorage.setItem('jwt', await authServerInteraction(SignedInfo, '/login', 'text'));
				}}
			>
				Register With Metamask
			</button>
			<br />
			<button
				onClick={async () => {
					const SignedInfo = await signMessage();
					const jwt = await authServerInteraction(SignedInfo, '/login', 'json');
					localStorage.setItem('address', SignedInfo.address);
					localStorage.setItem('jwt', jwt.jwt);
					setResponseRegister('Usuario Logeado');
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
						[await getContractData('/addressContract', 'text'), '1000000000000000000000']
					).then(async response => {
						console.log(response);
						await sendWriteTransactions(
							await getContractData('/addressContract', 'text'),
							await getContractData('/abiContract', 'json'),
							'buyTicketFather',
							[[2, 1]]
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
						[await getContractData('/addressContract', 'text'), '1000000000000000000000']
					).then(async response => {
						console.log(response);
						await sendWriteTransactions(
							await getContractData('/addressContract', 'text'),
							await getContractData('/abiContract', 'json'),
							'buyTicketSon',
							[1, 2, '0xe97D620aae0Bc3262ea7f2b88Ea82477F20f21cA', true]
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
						'withdraw',
						['5000000000000000000']
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
						'collectTickets',
						[[1]]
					).then(response => {
						console.log(response);
					});
				}}
			>
				Cobrar Ticket
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
				Cobrar Inversor
			</button>
			<br />
			<br />
			<button
				onClick={async () => {
					setmyTickets(
						await userServerInteraction(localStorage.getItem('address'), '/user/getmytickets', 'text')
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
					setpackagesId(
						await userServerInteraction(localStorage.getItem('address'), '/user/getPackagesId', 'text')
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
					setmyInfo(await userServerInteraction(localStorage.getItem('address'), '/user/getmyinfo', 'text'));
				}}
			>
				Obtener mi Informacion
			</button>
			<h4>{myInfo}</h4>
		</>
	);
}

export default App;
