import {useState, useEffect} from 'react'
import { Box, Typography, Button, Icon, Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import style from "./styles/login.module.css";
import loginSvg from "./assets/login.svg";
import MetaIcon from "./assets/metaSvg.svg";
import union from "./assets/union.svg";
import logoInfinitus from "../../component/header/assets/infinitus.svg";
import { useNavigate } from 'react-router-dom';
import ModalErrorType from './ModalErrorType'
import ModalErrorNotMetamask from './ModalErrorNotMetamask';
import {	/* connectAddress, */
          nonWriteContractFunctions,
          sendWriteTransactions,
          setAddress,
          signMessage} from '../../functions/Web3Interactions'
import {getContractData, prepareServerConnection} from '../../functions/serverInteractions'
import { activateEventListeners, deactivateEventListeners} from '../../functions/eventListeners'

export default function Login() {
  const navigate = useNavigate()
  const [activeAlert, setActiveAlert] = useState(false)

  const [responseRegister, setResponseRegister] = useState(null);
    // console.log('responseRegister', responseRegister)
  const [open, setOpen] = useState(false)
  const [openNotRegister, setOpenNotRegister] = useState(false)

  const handleClickRegister = async () => {
    // console.log('Entre Register')
    if (!window.ethereum){
      setActiveAlert(true)
    } else {
      await setAddress().then(async (result) => {
        if (!result) {
          await activateEventListeners()
          await signMessage().then(async(SignedInfo) => {
            if (SignedInfo.signedMessage) {
              // setResponseRegister(await prepareServerConnection(SignedInfo, '/auth/regist', 'text'))
              const aux = await prepareServerConnection(SignedInfo, '/auth/register', 'text')
              if (aux.error) {
                setOpen(true)
              } else {
                setResponseRegister({status: 'success', 
                title: 'Registro Exitoso', 
                response: 'El registro fue realizado con exito'})
              }
              setOpen(true)
            } else console.log(SignedInfo, 'Linea32')
          })
        } else{
          console.log(result.message, 'Exito')
        }
      })
    }
  }

  const handleClickLogin = async () => {
    if (!window.ethereum) {
      setActiveAlert(true)
    } else {
      // await checkMetamaskInstalled()
        await setAddress()
      // console.log('Login Result', result)
        const SignedInfo = await signMessage()
        const jwt = await prepareServerConnection(SignedInfo, '/auth/login', 'json')
        // console.log('SERVER CONNECTION', jwt)
        if (jwt.userNotRegister){
          setOpenNotRegister(true)
        } else {
          localStorage.setItem('jwt', jwt.jwt)
          setResponseRegister(`Usuario logeado con la address: ${localStorage.getItem("address")}`)
          navigate('/perfil')
        }
    }
  }

  const setCloseMetamaskNotFound = () => {
    setActiveAlert(false)
  }

  const handleCloseNotRegister = () => {
    setOpenNotRegister(null)
  }

  const handleClose = () => {
    setOpen(false)
    setResponseRegister(null)
  }

  const ModalSession = () => {
    return (
        <div>
            <Dialog
                open={openNotRegister}
                onClose={handleCloseNotRegister}
                sx={{ padding: '0 20px 20px 20px'}}
            >
                <DialogTitle>Login notice
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: '#25292A', 
                    borderBottom: '1px solid #B4B4B4',
                    paddingBottom: '10px'
                    }}>
                        It is possible that the user is not registered.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                      background: "linear-gradient(60.23deg, #51BADB 19.54%, #662489 106.78%)",
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'Poppins',
                      fontSize: '11px',
                      
                    }} onClick={handleCloseNotRegister} >OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        height: "100vh",
        top: "0px",
        background: "#fafafa",
        zIndex: 10,
      }}
    >
      <Box
        component="div"
        sx={{
          position: "relative",
          height: "100%",
          zIndex: 1,
          background:
            "linear-gradient(203.72deg, rgba(105, 8, 121, 0.78) -10.54%, rgba(80, 186, 219, 0.78) 92.25%)",
        }}
        className={style.contLogin}
      >
        <Box className={style.contWelcome}>
          <Typography sx={{ color: "#fff" }}>WELCOME TO INFINITUS</Typography>
          <Box className={style.contImg}>
            <img src={loginSvg} alt="image-login" className={style.loginSvg} />
          </Box>
        </Box>

        <Box className={style.contButtons}>
          <Button
            variant="contained"
            className={style.btn}
            sx={{ background: "#6EBCEF" }}
            onClick={handleClickLogin}
          >
            Log in with Metamask{" "}
            <img src={MetaIcon} alt="metamask" className={style.metamask} />
          </Button>
          <div className={style.contUnion}>
            <img src={union} alt="-" className={style.imgUnion} />
          </div>
          <ModalSession/>
          <Button
            variant="contained"
            className={style.btn}
            sx={{ background: "#6EBCEF" }}
            onClick={handleClickRegister}
          >
            Register
          </Button>
        </Box>

        <Box className={style.contLogo}>
          <img src={logoInfinitus} alt="infinitus-log" className={style.logo} />
        </Box>

          <ModalErrorNotMetamask activeAlert={activeAlert} setCloseMetamaskNotFound={setCloseMetamaskNotFound} />

          <ModalErrorType open={open} handleClose={handleClose}/>
      </Box>
    </Box>
  );
}
