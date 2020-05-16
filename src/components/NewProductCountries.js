import React, { useState } from "react";
import { FormControl, Dropdown, Button } from "react-bootstrap";
import "./NewProductCountries.css";

export default function NewProductCountries() {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const [value, setValue] = useState("");
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const recentCountries = [
    {
      name: "Netherlands",
      flagUrl: "https://www.countryflags.io/nl/flat/32.png",
    },
    { name: "Spain", flagUrl: "https://www.countryflags.io/es/flat/32.png" },
    { name: "USA", flagUrl: "https://www.countryflags.io/us/flat/32.png" },
    { name: "Germany", flagUrl: "https://www.countryflags.io/de/flat/32.png" },
  ];
  const countryButtons = [];

  for (var i = 0; i < recentCountries.length; i++) {
    countryButtons.push(
      <Button key={i} variant="outline-dark">
        {recentCountries[i].name}{" "}
        <img src={recentCountries[i].flagUrl} alt="country-flag"></img>
      </Button>
    );
  }

  return (
    <div className="NewProductCountries">
      <h4>Country</h4>
      <p>Recently used...</p>
      {countryButtons}

      <Dropdown className="countries-dropdown">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          More countries...
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1">Austria</Dropdown.Item>
          <Dropdown.Item eventKey="2">Belgium</Dropdown.Item>
          <Dropdown.Item eventKey="3">Croatia</Dropdown.Item>
          <Dropdown.Item eventKey="4">Germany</Dropdown.Item>
          <Dropdown.Item eventKey="5">Italy</Dropdown.Item>
          <Dropdown.Item eventKey="6">Netherlands</Dropdown.Item>
          <Dropdown.Item eventKey="7">Switzerland</Dropdown.Item>
          <Dropdown.Item eventKey="8">USA</Dropdown.Item>
          <Dropdown.Item eventKey="9">...</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
