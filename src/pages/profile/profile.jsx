import style from "./Profile.module.css"
import img from "../../assets/retiro.png"
import copyImg from "../../assets/copyIcon.png"
import {AiOutlineCopy } from "react-icons/ai";
import { BiDownArrowAlt,BiHappyBeaming,BiShowAlt} from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard"

import { Toaster, toast } from "react-hot-toast"
export default function Profile() {
  const notify = () => toast('Here is your toast.');
  return(
    <>

      <div className={style.contWel}>
        <h1 className={style.titleW}>Welcome!</h1>
      </div>
      <div className={style.container}>
        <div className={style.contImgNom}>
         <div className={style.contInicialNom}><span>X</span></div>
          <h2 className={style.name}>Nombre</h2>
        </div>
        <div className={style.contDataCuenta}>
          <h3>Cuenta</h3>
          <div className={style.contData}>
            <span className={style.data}>4da44354gfDFGdfgdf45</span>
            < CopyToClipboard text='4da44354gfDFGdfgdf45'>
              <img className={style.copy} src={copyImg} alt=""  onClick={notify}/>
             {/* <AiOutlineCopy className={style.iconCopy}/> */}
             </CopyToClipboard >
          </div>
        </div>
        <div className={style.contCards}>
          <h3>Balances</h3>
          <div className={style.card}>
           <div className={style.dataT}>
             <h4 className={style.titleToken}>Busd Token</h4>
             <span className={style.numbT}>6511</span>
           </div>
          </div>
          <div className={style.card}>
           <div className={style.dataT}>
              <h4 className={style.titleToken}>Infinitus Token</h4>
              <span className={style.numbT}>6511 </span>
           </div>
           <div className={style.contImg}><img className={style.img} src={img}/></div>
          </div>
        </div>
        
      </div>
    </>
  );
}
    