import React from "react";
import { BsFilePlus } from "react-icons/bs";
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
        <a href="/products/new#images">
          <div className="quick-access-item">
            <IconContext.Provider value={{ color: "blue", size: "3em" }}>
              <BsFilePlus />
            </IconContext.Provider>
            <p>New</p>
          </div>
        </a>
      </div>

      <h3>Products Sold</h3>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <h3>Product Drafts</h3>
      <p>...</p>
      <p>...</p>
      <h3>Warnings</h3>
      <p>...</p>
      <p>...</p>
    </div>
  );
}
