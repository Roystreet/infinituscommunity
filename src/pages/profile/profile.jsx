import style from "./Profile.module.css"


export default function Profile() {
  return(
    <>

      <div className={style.contWel}>
        <h1 className={style.titleW}>Welcome!</h1>
      </div>
      <div>
        <div>
          <p>imagen</p>
          <h2>Nombre</h2>
        </div>
        <div>
          <h3>Cuenta</h3>
          <div>
            <span>numero hasheados</span>
            <p>cop</p>
          </div>
        </div>
        <div>
          <h3>Balances</h3>
          <div>
            <h4>Busd Token</h4>
            <span>6511</span>
          </div>
          <div>
            <h4>Infinitus Token</h4>
            <span>6511</span>
            <span>Icon</span>
          </div>
        </div>
        
      </div>
    </>
  );
}
    