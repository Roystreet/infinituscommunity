import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {Dialog, DialogTitle, DialogContent, DialogContentText ,Button, DialogActions} from '@mui/material'
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
import Settings from './pages/settings/Settings'
import ModalSession from './component/modalSession/modalSession'


function App() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  let address = localStorage.getItem('address')
  let token = localStorage.getItem('jwt')

  const checkIfWalletIsConnected = async () => {
    try {

      window.ethereum.on('accountsChanged', () => {
        if (address !== null ){
          console.log('Cambio de cuenta ? ')
          address = null
          localStorage.removeItem('jwt');
          localStorage.removeItem('address');
          setOpen(true)
        }
      })
      window.ethereum.on('disconnect', () => {
        // console.log('Disconect wallet')
        address = null
        localStorage.removeItem('jwt');
        localStorage.removeItem('address');
        navigate('/')
      });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    if (!address || !token){
      handleRedirect()
    }
  }, [address, token])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      navigate('/')
  };

  const handleRedirect = () => {
    !address || !token ? navigate('/') : navigate('/perfil')
  }
  

  return (
    <>
      <Layout>
        <ModalSession open={open} handleClose={handleClose}/>
        <Routes>
          {
            !token || token === undefined && !address ? <>
              <Route path="/" element={<Login />} /> 
            </>
              : 
              <>
                <Route path="/preventa" element={<Presale />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/paquetes" element={<Package />}/>
                <Route path="/error" element={<Error />} />
                <Route path='/settings' element={<Settings/>}/>
              </>
          }
        </Routes>
      </Layout>
    </>
  );
}

export default App;