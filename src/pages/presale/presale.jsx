import PresalePackage from "./presalePackege";
import { useState, useEffect } from "react";
import CardPresale from "../../component/cardPresale/cardPresale";
import { sendServerGet } from "../../functions/serverInteractions";

export default function Presale() {
  const [totalSupply, setTotalSupply] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await sendServerGet("/user/getpackagesid", "json");
        setTotalSupply(data);
        console.log(totalSupply);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className="container_presale">
        {PresalePackage.length > 0 && totalSupply ? (
          PresalePackage.map((data) => {
            return (
              <CardPresale
                id={data.id}
                name={data.name}
                image={data.image}
                value={data.value}
                amount={data.cantidad}
                supply={
                  totalSupply
                    ? totalSupply.filter(
                        (filter) => filter.packageId == data.id
                      )[0].totalForPresale
                    : null
                }
              />
            );
          })
        ) : (
          <p>hola mundo</p>
        )}
      </div>
    </>
  );
}
