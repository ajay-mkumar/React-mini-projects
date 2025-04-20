function Item({ item, handleCheck, deleteItem }) {
    return (
      <li>
        <input type="checkbox" onChange={handleCheck} checked={item.checked} />
        <span style={item.checked ? { textDecoration: "line-through" } : {}}>
          {`${item.qty} ${item.item}`}{" "}
        </span>
        <button style={{ color: "red" }} onClick={deleteItem}>
          X
        </button>
      </li>
    );
  }

  export default Item;