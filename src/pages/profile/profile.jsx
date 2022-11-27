import style from "./Profile.module.css"


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
            <p>cop</p>
          </div>
        </div>
        <div className={style.contCards}>
          <h3>Balances</h3>
          <div className={style.card}>
           <div>
             <h4>Busd Token</h4>
             <span>6511</span>
           </div>
          </div>
          <div className={style.card}>
           <div>
              <h4>Infinitus Token</h4>
              <span>6511 </span>
           </div>
           <div><span>Icon</span></div>
          </div>
        </div>
        
      </div>
    </>
  );
}
    