import {useState, useEffect} from 'react'
import { Box, Typography, Button, Icon, Alert, AlertTitle } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import style from "./styles/login.module.css";
import loginSvg from "./assets/login.svg";
import MetaIcon from "./assets/metaSvg.svg";
import union from "./assets/union.svg";
import logoInfinitus from "../../component/header/assets/infinitus.svg";
import { useNavigate } from 'react-router-dom';
import {	/* connectAddress, */
          nonWriteContractFunctions,
          sendWriteTransactions,
          setAddress,
          signMessage} from '../../functions/Web3Interactions'
import {getContractData, prepareServerConnection} from '../../functions/serverInteractions'
// import { activateEventListeners, deactivateEventListeners} from '../../functions/eventListeners'

export default function Login() {
  const navigate = useNavigate()
  const [activeAlert, setActiveAlert] = useState(false)
  const [responseRegister, setResponseRegister] = useState("");


  const handleClickRegister = async () => {
    console.log('Entre Register')
    await setAddress().then(async (result) => {
      if (!result) {
        await activateEventListeners()
        await signMessage().then(async(SignedInfo) => {
          if (SignedInfo.signedMessage) setResponseRegister(await prepareServerConnection(SignedInfo, '/auth/register', 'text'))
          else console.log(SignedInfo)
        })
      } else console.log(result.message, 'Exito')
    })
  }

  const handleClickLogin = async () => {
    if (!window.ethereum) {
      setActiveAlert(true)
    } else {
      // await checkMetamaskInstalled()
      let result = await setAddress()
      console.log('Login Result', result)
      const SignedInfo = await signMessage()
      const jwt = await prepareServerConnection(SignedInfo, '/auth/login', 'json')
      localStorage.setItem('jwt', jwt.jwt)
      setResponseRegister(`Usuario logeado con la address: ${localStorage.getItem("address")}`)
      // navigate('/perfil')
    }
  }

  useEffect(() => {
    console.log('Response Register', responseRegister)
    if (responseRegister){
      console.log('ModalRegister Exitoso')
    }
  }, [responseRegister])

  // const checkMetamaskInstalled = async () => {
  //   if (window.ethereum) {
  //     // await activateEventListeners()
  //   } else {
  //     window.alert('Instala Metamask')
  //   }
  // }

  const setClose = () => {
    setResponseRegister(null)
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
        {
            activeAlert ? 
              <Alert severity="error" sx={{
                position: 'relative',
                zIndex: 4,
                bottom: '15px'

              }}>
                <AlertTitle>Hubo un problema</AlertTitle>
                  No tienes instalado MetaMask 
              </Alert>
             : null
          }

          {
            responseRegister ? 
            <Alert severity="success" sx={{
              position: 'relative',
              zIndex: 4,
              bottom: '15px',
              width: '80%'
            }}
            onClose={setClose()}
            >
              <AlertTitle>Registro Exitoso</AlertTitle>
                Ya puedes ingresar a la APP
            </Alert>
           : null
          }


      </Box>
    </Box>
  );
}
