import { useState } from "react";

function ItenaryForm({ setCheckList }) {
  const [itenaryList, setItenaryList] = useState([
    {
      item: "",
      qty: 1,
    },
  ]);

  const handleChange = (e) => {
    setItenaryList({
      ...itenaryList,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (itenaryList.item === "" || itenaryList.qty === 0) return;

    setCheckList((prevItems) => [
      ...prevItems,
      {
        id: Math.random(),
        checked: false,
        item: itenaryList.item,
        qty: itenaryList.qty,
      },
    ]);

    setItenaryList({
      item: "",
      qty: "",
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your tavel</h3>
      <select name="qty" value={itenaryList.qty} onChange={handleChange}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        name="item"
        value={itenaryList.item}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ItenaryForm;