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


function App() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  // const [changeAccount, setChangeAccount] = useState(null)
  let address = localStorage.getItem('address')
  let token = localStorage.getItem('jwt')
  // console.log('Value Address', address)
  const checkIfWalletIsConnected = async () => {
    try {

      window.ethereum.on('accountsChanged', () => {
        if (address !== null ){
          console.log('Cambio de cuenta ? ')
          address = null
          localStorage.removeItem('jwt');
          localStorage.removeItem('address');
          // window.alert('Inicia sesion nuevamente');
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
      // console.log('ChangeAccount', changeAccount)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    if (!address || !token){
      handleRedirect()
      // setChangeAccount(null)
    }
    // console.log('UseEffect - APP - Address', address, address)

  }, [address, token])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      navigate('/')
  };

  const handleRedirect = () => {
    // console.log('Vale')
    !address || !token ? navigate('/') : navigate('/perfil')
  }
  
  const ModalSession = () => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Aviso inicio de sesión</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Parece que hubo un cambio de cuenta. Debes iniciar sesión nuevamente!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


  return (
    <>
      <Layout>
        <ModalSession/>
        <Routes>
          {
            !address || !token? <>
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
