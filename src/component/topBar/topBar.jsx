import style from './styles/topBar.module.css'
import menu from './assets/menu.svg'
import infinitus from './assets/infinitus.svg'
import settings from './assets/settings.svg'
import {Link} from 'react-router-dom'
import {IoMdSettings, IoMdInformationCircleOutline} from 'react-icons/io'
import {FaRegUserCircle} from 'react-icons/fa'


const TopBar = () => {

    const clickChecked = () => {
        var msg = document.getElementById('menu').click()
    }


    return (
        <div className='header'>
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
                        <Link to='home' className={style.link} onClick={clickChecked}><FaRegUserCircle className={style.iconHeader}/> name user</Link>
                        
                        <Link to='project' className={style.link} onClick={clickChecked}><IoMdInformationCircleOutline className={style.iconHeader}/>About</Link>
                        
                        <Link to='/settings' className={style.linkAux} onClick={clickChecked}><IoMdSettings className={style.iconHeader}/>Settings</Link>
                    </div>
                </div>
            </div>
      </div>
    )
}


export default TopBar;