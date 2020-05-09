import React from "react";
import { Button } from "react-bootstrap";
import { FiRefreshCw } from "react-icons/fi";
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <FiRefreshCw className="spinning" />}
      {props.children}
    </Button>
  );
}
