import style from "./cardTikets.module.css"
import img from "./assets/Vector.png"
const CardTikets = () =>{
  return(
    <div className={style.card}>
        <div>
          <div>
          <img className={style.img} src="https://i0.wp.com/criptotendencia.com/wp-content/uploads/2018/08/Ejemplo-billetes-criptomonedas.jpg?fit=1000%2C667&ssl=1" alt="" />
        <div className={style.contIcon}> <span className={style.icons}>ico</span>
        <div className={style.contShare}>
         <img src={img} className={style.vector} alt="" />
        </div>
        </div>
          </div>
        </div>
       
        <div className={style.contBtn}>
          
          <button className={style.btn}>Give away</button>
          <button className={style.btn}>Collab</button>
        </div>
    </div>
  )
}
export default CardTikets;

// export default function CardTikets() {
//   // Mostrar Tikets 
//   return (
//     <div>
//      <h1>Hola</h1>
//     </div>
//   );
// }