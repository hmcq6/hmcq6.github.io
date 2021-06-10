import React, { useState } from "react";

let onItemClick;

const Navigation = ({ defaultIndex, children }) => {
  const [selectedItem, setSelectedItem] = useState(defaultIndex);

  const changeItem = (itemIndex) => {
    if (typeof onItemClick === "function") onItemClick(itemIndex);
    if (itemIndex !== selectedItem) setSelectedItem(itemIndex);
  };

  const items = [].concat(children);

  const buttons = items.map(({ props }) => {
    return props;
  });

  return (
    <>
      {buttons.map(({ index, label }) => (
        <button onClick={() => changeItem(index)}>{label}</button>
      ))}

      {items.filter(({ props: { index } }) => index === selectedItem)}
    </>
  );
};

export default Navigation;
