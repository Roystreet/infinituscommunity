import './styles/cardPresale.css'

export default function CardPresale({ id, name, value, image, cantidad }) {
  return (
    <div className="card_presale">
      <div className="container_image_presale">
        <img src={image} className="img_presale"></img>
        <div className="value_presale"> {value}</div>
      </div>
      <div className="container_actions_presale">
        <div>{name}</div>
      </div>
    </div>
  );
}
