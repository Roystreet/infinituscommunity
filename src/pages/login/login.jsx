import {Box, Typography, Button, Icon} from '@mui/material'
import {createSvgIcon} from '@mui/material/utils'
import style from './styles/login.module.css'
import loginSvg from './assets/login.svg'
import MetaIcon from './assets/metaSvg.svg'
import union from './assets/union.svg'
import logoInfinitus from '../../component/header/assets/infinitus.svg'

export default function Login() {
  return (
    <Box sx={{
      position: 'absolute',
      zIndex: 20,
      background: "linear-gradient(203.72deg, rgba(105, 8, 121, 0.78) -10.54%, rgba(80, 186, 219, 0.78) 92.25%)"
    }} 
    className={style.contLogin}
    >
        <Box className={style.contWelcome}>
          <Typography sx={{color: '#fff'}}>WELCOME TO INFINITUS</Typography>
          <Box className={style.contImg}>
            <img src={loginSvg} alt='image-login' className={style.loginSvg}/>
          </Box>
        </Box>

        <Box className={style.contButtons}>
          <Button variant="contained" className={style.btn}
          sx={{background: "#6EBCEF"}}
          >Log in with Metamask <img src={MetaIcon} alt='metamask' className={style.metamask}/></Button>
          <div className={style.contUnion}>
            <img src={union} alt='-' className={style.imgUnion}/>
          </div>
          <Button variant="contained" className={style.btn} 
            sx={{background: "#6EBCEF"}}
          >Register</Button>
        </Box>

        <Box className={style.contLogo}>
          <img src={logoInfinitus} alt='infinitus-log' className={style.logo} />
        </Box>
    </Box>
  )
}
