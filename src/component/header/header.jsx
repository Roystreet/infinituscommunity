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

      <div className={style.contNav}>
        <div className={style.headerIcon}>   
            <Link to='/'>
                <img 
                    src={infinitus} 
                    alt='logo-png'
                    className={style.logo}
                />
            </Link>
        </div>
        <label htmlFor='menu' className={style.navLabel}>
            <img src={menu} alt='menu-svg' className='navSvg' />
        </label>
        <input type='checkbox' id='menu' className={style.navInput}></input>
        <div className={style.headerItems}>
            <div className={style.contItem}>
                <div className={style.contLink}>
                  <Link to='/user' className={style.link} onClick={clickChecked}>
                    <FaRegUserCircle className={style.iconHeader}/> name user</Link>
                </div>
                <div className={style.contLink}>
                  <Link to='/about' className={style.link} onClick={clickChecked}>
                    <IoMdInformationCircleOutline className={style.iconHeader}/>About</Link>
                </div>
                <div className={style.contLink}>
                  <Link to='/settings' className={style.linkAux} onClick={clickChecked}>
                    <IoMdSettings className={style.iconHeader}/>Settings</Link>
                </div>
            </div>
        </div>
      </div>
    
  );
}
