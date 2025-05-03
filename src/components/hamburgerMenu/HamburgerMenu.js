import React from 'react';
import Button from "../button/Button";
import buttons from "../../data/buttons/buttons.json";

function HamburgerMenu({ onButtonClick }) {
  console.log("==> HamburgerMenu rendered, buttons: ", buttons);

  return (
    <div className="menu">
      <div>
        {buttons.map((element) => (
          <Button
            key={element.Index}
            data={element}
            showLabIndex={true}
            onClick={() => onButtonClick(element)}
          />
        ))}
      </div>
    </div>
  );
}

export default HamburgerMenu;
