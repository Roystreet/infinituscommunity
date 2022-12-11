import style from "./Profile.module.css"
import img from "../../assets/retiro.png"
import imgFlecha from "../../assets/Group67.png"
import copyImg from "../../assets/copyIcon.png"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast"
import { prepareServerConnection } from "../../functions/serverInteractions";
import { nonWriteContractFunctions } from "../../functions/Web3Interactions";
import { getContractData } from "../../functions/serverInteractions";

export default function Profile() {
  const [myInfo, setmyInfo] = useState({});
  const [balanceBUSD, setbalanceBUSD] = useState('');
  const [balanceINFI, setbalanceINFI] = useState('');
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

//   useEffect( () => {
//     const balnceInfi = async () =>{
//     setbalanceINFI(
//       await nonWriteContractFunctions(
//         await getContractData('/addressContract', 'text'),
//         await getContractData('/abiContract', 'json'),
//         'balanceOf',
//         localStorage.getItem('address'),
//         18
//       )
//     )
//   }
//     balnceInfi()
// 	}, []);
// console.log(myInfo)
// console.log(balanceINFI)

// let name = [myInfo.nickName]



  const notify = () => toast('Here is your toast.');

let initialName = myInfo.nickName;
let inicial = initialName
console.log(inicial)
  return(
    <>

      <div className={style.contWel}>
        <h1 className={style.titleW}>Welcome!</h1>
      </div>
      <div className={style.container}>
        <div className={style.contImgNom}>
         <div className={style.contInicialNom}><span>{}</span></div>
          <h2 className={style.name}>{myInfo?.nickName}</h2>
        </div>
        <div className={style.contDataCuenta}> 
          <h3>Cuenta</h3>
          <div className={style.contData}>
            <span className={style.data}>{myInfo?.address}</span>
            < CopyToClipboard text={myInfo?.address}>
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
          
          <div className={style.cardIToken}>

              <h4 className={style.titleToken}>Infinitus Token</h4>
              <span className={style.numbT}>6511 </span>
          
           <buttom className={style.contImg}>Withdraw <img className={style.img} src={img} alt="not found"/></buttom>
          </div>
        <img src={imgFlecha} className={style.imgFlecha} alt="not found" />
        
          <div className={style.card}>
           
             <h4 className={style.titleToken}>Busd Token</h4>
             <span className={style.numbT}>6511</span>
           
          </div>
        </div>
        
      </div>
    </>
  );
}
    