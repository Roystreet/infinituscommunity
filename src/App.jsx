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
import Ranking from "./pages/ranking/ranking";
// Ruta para mostrar los paquetes
import Package from "./pages/package/package";
// Ruta de error
import Error from "./pages/error/error";
//Ruta de Settings
import Settings from "./pages/settings/Settings";
// Ruta de  invitado
import Invitado from "./pages/invitado/invitado";

function App() {
	const [userLoged, setUserLoged] = useState(false);

	const chekUserLoged = () => {
		if (localStorage.getItem("jwt") != undefined) {
			setUserLoged(true);
		}
	};

	useEffect(() => {
		chekUserLoged();
	}, []);

	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={!userLoged ? <Login /> : <Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/preventa" element={<Presale />} />
					<Route path="/perfil" element={<Profile />} />
					<Route path="/paquetes" element={<Package />} />
					<Route path="/error" element={<Error />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/share/:idticket/owner/:address" element={<Invitado />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
