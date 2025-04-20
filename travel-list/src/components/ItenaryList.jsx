import { useState } from "react";
import Item from "./Item";

function ItenaryList({ checkList, setCheckList }) {
    const [sortBy, setSortBy] = useState("input");
  
    let sortedList;
  
    if (sortBy === "input") {
      sortedList = [...checkList].sort((a, b) => a.item.localeCompare(b.item));
    } else if (sortBy === "qty") {
      sortedList = [...checkList].sort((a, b) => a.qty - b.qty);
    } else if (sortBy === "checked") {
      sortedList = [...checkList].sort((a, b) => a.checked - b.checked);
    }
  
    const handleCheck = (id) => {
      setCheckList((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };
  
    const deleteItem = (id) => {
      setCheckList((prevItems) => prevItems.filter((item) => item.id !== id));
    };
  
    const handleClear = () => {
      const confirmed = window.confirm("Are your sure you want to clear the list?");
  
      if (confirmed) {
        setCheckList([]);
      }
    }
  
    return (
      <div className="list">
        {sortedList.length > 0 && (
          <ul>
            {sortedList.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                handleCheck={() => handleCheck(item.id)}
                deleteItem={() => deleteItem(item.id)}
              />
            ))}
          </ul>
        )}
        <div className="actions">
          <select
            name="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="input">sort by input</option>
            <option value="qty">sort by quantity</option>
            <option value="checked">sort by packed</option>
          </select>
          <button onClick={handleClear}>clear list</button>
        </div>
      </div>
    );
  }

  
  export default ItenaryList;