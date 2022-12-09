import style from "./Profile.module.css"
import img from "../../assets/retiro.png"
import copyImg from "../../assets/copyIcon.png"
import {AiOutlineCopy } from "react-icons/ai";
import { BiDownArrowAlt,BiHappyBeaming,BiShowAlt} from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast"
import { prepareServerConnection } from "../../functions/serverInteractions";


export default function Profile() {
  const [myInfo, setmyInfo] = useState({});

// const objt = {
//   infoUser:{ },
//   busdToken:{},
//   infinitusToken:{}
// }

  useEffect( () => {
    const data = async ()=>{
    setmyInfo(
      await prepareServerConnection(
        { address: localStorage.getItem('address') },
        '/user/getmyinfo',
        'json',
        localStorage.getItem('jwt')
      )
    ); 
   }
   data()
	}, []);

console.log(myInfo)

let name = [myInfo.nickName]
console.log(name)
// useEffect(()=>{
//   async () => {
//     setmyInfo(
//       await prepareServerConnection(
//         { address: localStorage.getItem('address') },
//         '/user/getmyinfo',
//         'text',
//         localStorage.getItem('jwt')
//       )
//     );
//   }
//   // console.log(localStorage.getItem('jwt'))
//   }

// )
 

  const notify = () => toast('Here is your toast.');


  return(
    <>

      <div className={style.contWel}>
        <h1 className={style.titleW}>Welcome!</h1>
      </div>
      <div className={style.container}>
        <div className={style.contImgNom}>
         <div className={style.contInicialNom}><span>{myInfo.nickName[0]}</span></div>
          <h2 className={style.name}>{myInfo.nickName}</h2>
        </div>
        <div className={style.contDataCuenta}>
          <h3>Cuenta</h3>
          <div className={style.contData}>
            <span className={style.data}>{myInfo.address}</span>
            < CopyToClipboard text={myInfo.address}>
              <img className={style.copy} src={copyImg} alt=""  onClick={()=> toast.success('Id copied')} />
             {/* <AiOutlineCopy className={style.iconCopy}/> */}
             </CopyToClipboard >
                  
          <Toaster toastOptions={{
           style: {
            padding: '16px',
            color:'blue',
             marginTop: '250px',
            
            },
             }}/>
        
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
    