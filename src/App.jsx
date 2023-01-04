import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DisplayMessage from "./component/displayMessage/displayMessage";
import Message from "./component/message/message";
import Layout from "./component/layout/layout";
//Ruta iniciar sesion
import Login from "./pages/login/login";
//Ruta Preventa
import Presale from "./pages/presale/presale";
//Ruta Perfil
import Profile from "./pages/profile/profile";
//Ruta Ranking
/* import Ranking from "./pages/ranking/ranking"; */
// Ruta para mostrar los paquetes
import Package from "./pages/package/package";
//Ruta de Settings
import Settings from "./pages/settings/Settings";
// Ruta de  invitado
import Invitado from "./pages/invitado/invitado";
import { deactivateEventListeners, ListenerAccountChanged, ListenerNetworkChanged } from "./functions/eventListeners";

function App({ userConnected }) {
	const [userLogged, setUserLogged] = useState(userConnected);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({});
	const [exitRoute, setExitRoute] = useState(null);
	const [displayButton, setDisplayButton] = useState("");
	const [status, setStatus] = useState(null);
	const [finalF, setfinalF] = useState(null);

	useEffect(() => {
		if (window.ethereum) {
			if (userLogged == true) {
				ListenerAccountChanged(setOpen, setMessage, setExitRoute, setUserLogged, setStatus, setDisplayButton);
				ListenerNetworkChanged(setOpen, setMessage, setDisplayButton, setStatus);
			} else {
				deactivateEventListeners();
				ListenerNetworkChanged(setOpen, setMessage, setDisplayButton, setStatus);
			}
		}
	}, [userLogged]);

	return (
		<>
			{userLogged ? (
				<Layout>
					<Routes>
						<Route path="/profile" element={<Profile setUserLogged={setUserLogged} />} />
						<Route path="/mytickets" element={<Package />} />
						<Route path="/presale" element={<Presale />} />
						<Route path="/settings" element={<Settings setUserLogged={setUserLogged} />} />
						<Route path="/share/:idticket/owner/:address" element={<Invitado />} />
						<Route
							path={"*"}
							element={
								<DisplayMessage
									open={true}
									setOpen={setOpen}
									messageData={{ tittle: "Notification", message: "This Page doesn't Exist or is on Work" }}
									allowBackdropClick={false}
									exitRoute={"/"}
								/>
							}
						/>
					</Routes>
				</Layout>
			) : (
				<>
					<Message />
					<Routes>
						<Route exact path="/" element={<Login setUserLogged={setUserLogged} />} />
						<Route
							path={"*"}
							element={
								<DisplayMessage
									open={true}
									setOpen={setOpen}
									messageData={{ tittle: "Notification", message: "This Page doesn't Exist or is on Work" }}
									allowBackdropClick={false}
									exitRoute={"/"}
								/>
							}
						/>
					</Routes>
				</>
			)}
			<DisplayMessage
				open={open}
				setOpen={setOpen}
				messageData={message}
				allowBackdropClick={true}
				exitRoute={exitRoute}
				displayButton={displayButton}
				status={status}
			/>
		</>
	);
}

export default App;
