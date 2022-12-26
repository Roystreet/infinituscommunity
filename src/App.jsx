import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
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
import DisplayMessage from "./component/displayMessage/displayMessage";
import Message from "./component/message/message";

function App() {
	const [userLoged, setUserLoged] = useState(false);
	const [open, setOpen] = useState(false);

	const chekUserLoged = () => {
		if (localStorage.getItem("jwt") != undefined) {
			setUserLoged(true);
		}
	};

	useEffect(() => {
		chekUserLoged();
	}, [userLoged]);

	return (
		<>
			{userLoged ? (
				<Layout>
					<Routes>
						<Route path="/" element={<Profile setUserLoged={setUserLoged} />} />
						<Route
							path="/login"
							element={
								!userLoged ? (
									<Login setUserLoged={setUserLoged} />
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
						<Route path="/perfil" element={<Profile setUserLoged={setUserLoged} />} />
						<Route path="/paquetes" element={<Package />} />
						<Route path="/error" element={<Error />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/share/:idticket/owner/:address" element={<Invitado />} />
						<Route
							path="*"
							element={
								<DisplayMessage
									open={true}
									setOpen={setOpen}
									messageData={{ tittle: "Error", message: "Esta ruta no Existe" }}
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
						<Route path="/" element={<Login setUserLoged={setUserLoged} />} />
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
						<Route path="/share/:idticket/owner/:address" element={<Invitado />} />
					</Routes>
				</>
			)}
		</>
	);
}

export default App;
