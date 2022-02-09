/* eslint-disable react/style-prop-object */
import React, { useRef, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import services from "../util/services";
var ipfsAPI = require("ipfs-api");

export default function Register() {
  const [fileValue, setFileValue] = useState(null);
  const inputFile = useRef(null);


  const onChange = (e) => {
    var file = e.target.files[0];
    services.getBase64(file).then((data) => setFileValue(data));
  };

  const submit = async (e) => {
    e.preventDefault();
    var ipfs = ipfsAPI({
      host: `${process.env.REACT_APP_HOST_IPFS}`,
      port: `${process.env.REACT_APP_PORT_IPFS}`,
      protocol: "https",
    });
    ipfs.files.add(Buffer.from(fileValue), async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("upload is successful");
      const token = services.getAcessToken();

      // Realizando gravação da informação.
      const options2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          idContract: `${process.env.REACT_APP_ID_CONTRACT}`,
          value: [
            result[0].path,
            e.target.elements[0].value,
            e.target.elements[1].value,
            e.target.elements[2].value,
            e.target.elements[3].value,
            e.target.elements[6].value,
          ],
        }),
      };
      var response = await fetch(`${process.env.URL_DOCSTONE}/documents`, options2);
      console.log(response);
    });
  };

  return (
    <form className="form-inline" onSubmit={(e) => submit(e)}>
      <Card style={{ width: "rem" }}>
        <Card.Body>
          <Row className="m-3">
            <label>
              <b>Origem:</b>
            </label>
            <input required type="text" name="origin"/>
          </Row>
          <Row className="m-3">
            <label>
              <b>Nome do Evento:</b>
            </label>
            <input type="text" name="name" />
          </Row>
          <Row className="m-3">
            <label>
              <b>Descrição:</b>
            </label>
            <textarea required type="text" name="description" />
          </Row>
          <Row className="m-3">
            <Col style={{ width: "50%" }}>
              <label>
                <b>Data do evento:</b>
                <input required type="date" name="date" />
              </label>
            </Col>
            <Col style={{ width: "50%" }}>
              <label>
                <b>Imagem:</b>
              </label>
              <div>
                <input
                  required
                  className="d-none"
                  type="file"
                  ref={inputFile}
                  onChange={onChange}
                />
                <Button
                  onClick={(e) => inputFile.current.click()}
                  className="btn btn-secondary"
                >
                  Upload
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="m-3">
            <label>
              <b>Créditos Imagem:</b>
            </label>
            <textarea required type="text" name="credit" />
          </Row>

          <br />
          <br />
          <Button
            type="submit"
            variant="dark"
            size="lg"
            style={{ marginLeft: "35%" }}
          >
            Registrar
          </Button>
        </Card.Body>
      </Card>
    </form>
  );
}
