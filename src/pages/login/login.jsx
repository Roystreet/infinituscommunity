import {useState, useEffect} from 'react'
import { Box, Typography, Button, Icon, Alert, AlertTitle } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import style from "./styles/login.module.css";
import loginSvg from "./assets/login.svg";
import MetaIcon from "./assets/metaSvg.svg";
import union from "./assets/union.svg";
import logoInfinitus from "../../component/header/assets/infinitus.svg";
import { loginProcess } from "../../functions/login";
import { signMessage } from "../../functions/Web3Interactions";
import { authServerInteraction } from '../../functions/serverInteractions';

export default function Login() {

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // let accounts;
  // let account;

  // const loginProccess = async () => {
  //   accounts = await provider.send('eth_requestAccounts', [])
  //   account = accounts[0]
    
  //   const signer = provider.getSigner(account)
  //   const nonce = `Nonce: ${await signer.getTransactionCount('latest')}`
  //   let signedMessage = await signer.signMessage(nonce);

  //   const responseCheck = await serverInteraction
  // }

  const [responseRegister, setResponseRegister] = useState('');
  const [activeAlert, setActiveAlert] = useState(false)

  const {ethereum} = window;

  const handleClick = async () => {
    if (!ethereum) {
      setActiveAlert(true)
    } else {
      const SignedInfo = await signMessage()
      console.log('SignedInfo', SignedInfo)
      setResponseRegister(await authServerInteraction(SignedInfo, '/register', 'text'))
      localStorage.setItem('address', SignedInfo.address)
      localStorage.setItem('jwt', await authServerInteraction(SignedInfo, '/login', 'text') )
    }
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
            onClick={handleClick}
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
      </Box>
    </Box>
  );
}
