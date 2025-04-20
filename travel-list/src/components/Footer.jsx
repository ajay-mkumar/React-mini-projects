function Footer({ totalItems, packedItems }) {
    if (!totalItems)
      return <footer className="stats">No items in your list</footer>;
    const percentage = Math.round((packedItems / totalItems) * 100);
    return (
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You've got everything! ready to go"
            : `You have ${totalItems} in your list and you are already packed ${packedItems} items ${percentage}%`}
        </em>
      </footer>
    );
  }

  export default Footer;