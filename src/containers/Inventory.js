import React, { useRef, useEffect } from "react";
import jexcel from "jexcel";

import "./Inventory.css";
import "../../node_modules/jexcel/dist/jexcel.css";

export default function Inventory(props) {
  const options = {
    data: [[]],
    minDimensions: [10, 10],
  };
  const jexcelRef = useRef(null);

  useEffect(() => {
    jexcel(jexcelRef.current, options);
  }, [options]);

  const addRow = () => {
    jexcelRef.current.jexcel.insertRow();
  };

  return (
    <div className="Inventory">
      <h2>Inventory</h2>
      <p>
        Here goes the inventory, interactive like your old good Excel tables..
      </p>
      <div ref={jexcelRef} />
      <br />
      <input type="button" onClick={addRow} value="Add new row" />
    </div>
  );
}
