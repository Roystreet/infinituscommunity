import style from "./Profile.module.css"
import img from "../../../public/retiro.png"
import copyImg from "../../../public/copyIcon.png"
export default function Profile() {
  return(
    <>

      <div className={style.contWel}>
        <h1 className={style.titleW}>Welcome!</h1>
      </div>
      <div className={style.container}>
        <div className={style.contImgNom}>
          <p >Avatar</p>
          <h2 className={style.name}>Nombre</h2>
        </div>
        <div className={style.contDataCuenta}>
          <h3>Cuenta</h3>
          <div className={style.contData}>
            <span className={style.data}>4da44354gfDFGdfgdf45</span>
            <img className={style.copy} src={copyImg} alt="" />
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
    