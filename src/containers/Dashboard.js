import React from "react";
import { BsFilePlus, BsListOl } from "react-icons/bs";
import { FcList } from "react-icons/fc";
import { IconContext } from "react-icons";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="quick-access-bar">
        <div className="quick-access-item">
          <IconContext.Provider value={{ color: "blue", size: "3em" }}>
            <FcList />
          </IconContext.Provider>
          <p>Products</p>
        </div>
        <div className="quick-access-item">
          <IconContext.Provider value={{ color: "blue", size: "3em" }}>
            <BsFilePlus />
          </IconContext.Provider>
          <p>New</p>
        </div>
      </div>
    </div>
  );
}
