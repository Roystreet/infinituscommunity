import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
// Ruta de error
import Error from "./pages/error/error";
//Ruta de Settings
import Settings from "./pages/settings/Settings";
// Ruta de  invitado
import Invitado from "./pages/invitado/invitado";
import { deactivateEventListeners, ListenerAccountChanged, ListenerNetworkChanged } from "./functions/eventListeners";

function App({ userConnected }) {
	const [userJWT, setUserJWT] = useState(userConnected);
	const [userLogged, setUserLogged] = useState(false);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({});
	const [exitRoute, setExitRoute] = useState(null);

	useEffect(() => {
		if (window.ethereum) {
			if (userLogged == true) {
				ListenerAccountChanged(setOpen, setMessage, setExitRoute, setUserLogged, setUserJWT);
			} else {
				deactivateEventListeners();
				ListenerNetworkChanged(setOpen, setMessage);
			}
		}
	}, [userLogged]);

	return (
		<>
			{userJWT ? (
				<Layout>
					<Routes>
						<Route
							path="/"
							element={<Profile userJWT={userJWT} setUserJWT={setUserJWT} userLogged={userLogged} setUserLogged={setUserLogged} />}
						/>
						<Route
							path="/login"
							element={
								!userJWT ? (
									<Login setUserJWT={setUserJWT} setUserLogged={setUserLogged} />
								) : (
									<DisplayMessage
										open={true}
										setOpen={setOpen}
										messageData={{ tittle: "Notificacion", message: "Ya estas conectado :)" }}
										allowBackdropClick={false}
										exitRoute={"/"}
									/>
								)
							}
						/>
						<Route path="/preventa" element={<Presale />} />
						<Route
							path="/perfil"
							element={<Profile userJWT={userJWT} setUserJWT={setUserJWT} userLogged={userLogged} setUserLogged={setUserLogged} />}
						/>
						<Route path="/paquetes" element={<Package setUserJWT={setUserJWT} setUserLogged={setUserLogged} />} />
						<Route path="/error" element={<Error />} />
						<Route path="/settings" element={<Settings setUserJWT={setUserJWT} setUserLogged={setUserLogged} />} />
						<Route path="/share/:idticket/owner/:address" element={<Invitado setUserJWT={setUserJWT} setUserLogged={setUserLogged} />} />
						<Route
							path="*"
							element={
								<DisplayMessage
									open={true}
									setOpen={setOpen}
									messageData={{ tittle: "Error", message: "Esta ruta no existe o esta en mantenimiento" }}
									allowBackdropClick={true}
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
						<Route path="/" element={<Login setUserJWT={setUserJWT} setUserLogged={setUserLogged} />} />
						<Route
							path="*"
							element={
								<DisplayMessage
									open={!open}
									setOpen={setOpen}
									messageData={{ tittle: "Error", message: "Debe Iniciar Sesion " }}
									allowBackdropClick={true}
									exitRoute={"/"}
								/>
							}
						/>
					</Routes>
				</>
			)}
			<DisplayMessage open={open} setOpen={setOpen} messageData={message} allowBackdropClick={false} exitRoute={exitRoute} />
		</>
	);
}

export default App;
