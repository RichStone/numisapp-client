import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewProduct.css";

export default function NewProduct(props) {
  const file = useRef(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return description.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);
  }

  return (
    <div className="NewProduct">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="description">
          <FormControl
            value={description}
            componentClass="textarea"
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Image</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Add
        </LoaderButton>
      </form>
    </div>
  );
}
