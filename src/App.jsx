import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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
//Vista del invitado
import Invitado from "./pages/invitado/invitado";

function App() {
  const navigate = useNavigate()
  let address = localStorage.getItem('address')
  // const [changeAccount, setChangeAccount] = useState(null)
  const checkIfWalletIsConnected = async () => {
    try {
      window.ethereum.on('accountsChanged', () => {
        console.log('Cambio de cuenta ? ')
        // setChangeAccount(true)
        localStorage.removeItem('jwt');
        localStorage.removeItem('address');
        window.alert('Inicia sesion nuevamente');
      })
      // console.log('ChangeAccount', changeAccount)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    if (!address){
      handleRedirect()
      // setChangeAccount(null)
    }
    console.log('UseEffect - APP - Address', address)

  }, [address])

  const handleRedirect = () => {
    console.log('Vale verga')
    !address ? navigate('/') : navigate('/perfil')
  }

  

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/preventa" element={<Presale />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/paquetes" element={<Package />}/>
          <Route path="/prueba" element={<Invitado />}/>
          <Route path="/error" element={<Error />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
