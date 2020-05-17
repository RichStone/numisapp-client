import React from "react";
import { BsFilePlus } from "react-icons/bs";
import { FcList } from "react-icons/fc";
import { IconContext } from "react-icons";
import "./Dashboard.css";
import PolarChartExample from "../components/PolarChartExample";
import BarChartExample from "../components/BarChartExample";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="quick-access-bar">
        <a href="/inventory">
          <div className="quick-access-item">
            <IconContext.Provider value={{ color: "blue", size: "3em" }}>
              <FcList />
            </IconContext.Provider>
            <p>Products</p>
          </div>
        </a>
        <a href="/products/new#images">
          <div className="quick-access-item">
            <IconContext.Provider value={{ color: "blue", size: "3em" }}>
              <BsFilePlus />
            </IconContext.Provider>
            <p>New</p>
          </div>
        </a>
      </div>

      <BarChartExample></BarChartExample>

      <PolarChartExample></PolarChartExample>

      <h3>Products Recently Sold</h3>
      <p>
        <a href="#">
          Australia - 5 Dollars 2006 Kangaroo Känguru - Gold Proof - 200,- €
        </a>
      </p>
      <p>
        <a href="#">
          Netherlands 1814 Gold Ducat - parcrestra concordiares - 300,- €
        </a>
      </p>
      <p>...</p>
      <h3>Product Drafts</h3>
      <p>
        <a href="#">
          Germany 1906 A coin - ½ Mark - Wilhelm II - Silver - 30,- €
        </a>
      </p>
      <p>...</p>
      <h3 style={{ color: "orange" }}>Warnings</h3>
      <p>
        Product Netherlands 1814 Gold Ducat was recently sold but still not sent
        (3 days).
      </p>
      <p>Germany 1906 A coin is in drafts for 8 days</p>
      <p>...</p>
    </div>
  );
}
