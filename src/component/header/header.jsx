import { Box } from "@mui/material";
import { useState } from "react";
import style from "./styles/header.module.css";
import menu from "./assets/menu.svg";
import infinitus from "./assets/infinitus.svg";
import { Link } from "react-router-dom";
import { IoMdSettings, IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  const [route, setRoute] = useState("");

  const clickChecked = () => {
    var msg = document.getElementById("menu").click();
  };

  return (
    <Box sx={{
      height: 50,
      background: 'linear-gradient(262.41deg, #690879 -10.12%, #50BADB 62.5%);'
    }}>
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
          <h5 className={style.navTitle}>USER PANEL</h5>
        <label htmlFor='menu' className={style.navLabel}>
            <img src={menu} alt='menu-svg' className={style.navSvg} />
        </label>
        <input type='checkbox' id='menu' className={style.navInput}></input>
        <div className={style.headerItems}>
            <div className={style.contItem}>
                <div className={style.contLinkSup}>
                  <Link to='/perfil' className={style.link} onClick={clickChecked}>
                    <FaRegUserCircle className={style.iconHeader}/>User panel</Link>
                </div>
                <div className={style.contLinkSup}>
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
    </Box>
    
  );
}
