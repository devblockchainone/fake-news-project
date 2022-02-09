/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import services from "../util/services";

export default function Search() {
  const [resultValue, setResultValue] = useState(null);

  const search = async (e) => {
    e.preventDefault();
    setResultValue(true);
    console.log(e.target.elements[1].value);
    var token = services.getAcessToken();
    // Realizando gravação da informação.
    const options2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        idContract: `${process.env.ID_CONTRACT}`,
        idDocument: e.target.elements[6].value,
      }),
    };
    var response = await fetch(
      `${process.env.REACT_APP_URL_DOCSTONE}/documents_read`,
      options2
    );
    console.log(response);
  };

  return (
    <>
      <form className="form-inline" onSubmit={(e) => search(e)}>
        <Card style={{ width: "110%" }}>
          <Card.Body>
            <Row className="m-1">
              <label>Buscar por:</label>
              <Col>
                <Form.Select aria-label="Default select example">
                  <option value="1">Web</option>
                  <option value="2">Jornal</option>
                  <option value="3">Revista</option>
                </Form.Select>
              </Col>
              <Col>
                <input type="text" name="code" />
              </Col>
              <Col>
                <Button type="submit" variant="dark">
                  Buscar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </form>

      {resultValue != null && (
        <Card
          style={{
            width: "180%",
            marginTop: "10%",
            marginLeft: "-30%",
            marginBottom: "10%",
          }}
        >
          <Card.Body>
            <Row className="m-3">
              <Col style={{ width: "50%" }}>
                <Row>
                  <label>
                    <b>Origem:</b>
                  </label>
                  <text type="text" name="name">
                    {resultValue[0]}
                  </text>
                </Row>
                <Row>
                  <label>
                    <b>Nome do Evento:</b>
                  </label>
                  <text type="text" name="name">
                    {resultValue[1]}
                  </text>
                </Row>
                <Row>
                  <label>
                    <b>Descrição:</b>
                  </label>
                  <text type="text" name="name">
                    {resultValue[3]}
                  </text>
                </Row>
                <Row>
                  <label>
                    <b>data do evento:</b>
                  </label>
                  <text type="text" name="name">
                    {resultValue[4]}
                  </text>
                </Row>
                <Row>
                  <label>
                    <b>Créditos:</b>
                  </label>
                  <text type="text" name="name">
                    {resultValue[5]}
                  </text>
                </Row>
              </Col>
              <Col style={{ width: "50%" }}>
                <img
                  src="https://diariodorio.com/wp-content/uploads/2021/01/Vacinacao-696x464.jpg"
                  width="300"
                />
                <Card style={{ marginTop: "10%", alignItems: "center" }}>
                  <label>
                    <b>BLOCKCHAIN:</b>
                  </label>
                  <label>BLOCO:</label>
                  <label>12345</label>
                  <label>TRANSAÇÃO:</label>
                  <label>12345</label>
                  <label>TIMESTAMP:</label>
                  <label>12345</label>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
