import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  titular: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, titular, onSelectItem }: Props) {
  //  const items = ["Cliente 1", "Cliente 2", "Cliente 3"];
  // let selectedIndex = -1; //-1 = Ninguno seleccionado

  //Hook, este es el StateHook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //Otro ejemplo, const =[Nombre, SetearNombre]

  //let items =["aa"]
  //items=[]
  //No necesito usar el if, pero PUEDO si quiero
  //if (items.length === 0) {
  // return (
  //   <>
  //    <h1>Nutricionista</h1>
  //   <p>No tiene cluentes</p>
  // </>
  //);
  // }
  //Haciendolo por funcion puedo pasar parametros!!
  const noHay = () => {
    return items.length === 0 ? <p>No tiene clientes!</p> : null;
  };

  //Event Handler
  // const handleClick = (event: MouseEvent) => selectedIndex = index;

  return (
    //Los <> Implican fragmento abreviado
    // Los : en los brackets implican ELSE
    <>
      <h1>Prueba fragmento</h1>
      <h2>{titular}</h2>
      {items.length === 0 ? <p>No tiene clientes!</p> : null}
      {noHay()}
      <ul className="list-group">
        {items.map((item, index) => (
          //Los key son necesarios para React para que sepa que hacer con
          //ellos!!
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
