import React from "react";
import { Button } from "react-bootstrap";
import "./NewProductCategories.css";

export default function NewProductCategories() {
  const categories = [
    "Province",
    "Kingdom",
    "VOC",
    "Paper Money",
    "Antique",
    "Euro Coin",
    "World Coins",
    "World Gold",
    "Misc",
  ];
  const categoryButtons = [];

  for (var i = 0; i < categories.length; i++) {
    categoryButtons.push(
      <Button key={i} variant="outline-dark">
        {categories[i]}
      </Button>
    );
  }

  return (
    <div className="NewProductCategories">
      <p>Choose Category</p>
      {categoryButtons}
    </div>
  );
}
