import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItenaryForm from "./components/ItenaryForm";
import ItenaryList from "./components/ItenaryList";

function App() {
  const [checkList, setCheckList] = useState([]);

  const totalItems = checkList.length;
  const packedItems = checkList.filter((item) => item.checked).length;

  return (
    <div className="App">
      <Header />
      <ItenaryForm setCheckList={setCheckList} />
      <ItenaryList checkList={checkList} setCheckList={setCheckList} />
      <Footer totalItems={totalItems} packedItems={packedItems} />
    </div>
  );
}

export default App;
