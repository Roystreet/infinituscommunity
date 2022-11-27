import { Box } from "@mui/material";
import { useState } from "react";
import style from './styles/header.module.css'
import menu from './assets/menu.svg'
import infinitus from './assets/infinitus.svg'
import {Link} from 'react-router-dom'
import {IoMdSettings, IoMdInformationCircleOutline} from 'react-icons/io'
import {FaRegUserCircle} from 'react-icons/fa'

export default function Header() {
  const [route, setRoute] = useState("");

  const clickChecked = () => {
    var msg = document.getElementById('menu').click()
}


  return (
    <Box
      sx={{
        background:
          "linear-gradient(262.41deg, #690879 -10.12%, #50BADB 62.5%)",
        height: 45,
      }}
    >
        <Box className={style.contNav}>
          <Box className={style.headerIcon}>   
              <Link to='/'>
                  <img 
                      src={infinitus} 
                      alt='logo-png'
                      className={style.logo}
                  />
              </Link>
          </Box>
          <label htmlFor='menu' className={style.navLabel}>
              <img src={menu} alt='menu-svg' className='navSvg' />
          </label>
          <input type='checkbox' id='menu' className={style.navInput}></input>
          <Box className={style.headerItems} sx={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
              <Box className={style.contItem}>
                  <Link to='home' className={style.link} onClick={clickChecked}>
                    <FaRegUserCircle className={style.iconHeader}/> name user</Link>
                  
                  <Link to='project' className={style.link} onClick={clickChecked}>
                    <IoMdInformationCircleOutline className={style.iconHeader}/>About</Link>
                  
                  <Link to='roadmap' className={style.linkAux} onClick={clickChecked}>
                    <IoMdSettings className={style.iconHeader}/>Settings</Link>
              </Box>
          </Box>
        </Box>
    </Box>
  );
}
