import ListGroup from "./components/ListGroup";
import Menu from "./components/Menu";
<link rel="stylesheet" href="./index.css"></link>;

function App() {
  let items = ["Cliente 1", "Cliente 2", "Cliente 3"];
  const handleSelectItems = (item: string) => alert(item);
  return (
    <div>
      <Menu></Menu>
      <ListGroup
        items={items}
        titular={"Clientes"}
        onSelectItem={handleSelectItems}
      ></ListGroup>
    </div>
  );
}

export default App;
