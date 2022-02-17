/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Card, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { firestore } from "../utils/firebase";
import services from "../utils/services";
import axios from "axios";

export default function Search() {
  const [loadingValue, setLoadingValue] = useState(false);
  const [resultValue, setResultValue] = useState([]);

  const search = async (e) => {
    try {
      e.preventDefault();
      setResultValue([]);
      setLoadingValue(true);
      var typeSearch = e.target.elements[0].value;
      var idDocument = null;
      const query = firestore.collection("register");
      const snapshot = await query
        .where(typeSearch, "==", e.target.elements[1].value)
        .get();
      const data = snapshot.docs.map((doc) => doc.data());
      if (data.length === 0) {
        alert("dado não encontrado!");
        setLoadingValue(false);
        return;
      }

      // Realizando leitura da informação.
      const token = await services.getAcessToken();
      var result = await Promise.all(
        data.map(async (element) => {
          idDocument = element.id;
          return axios({
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            url: `${process.env.REACT_APP_URL_DOCSTONE}/documents_read`,
            data: JSON.stringify({
              idContract: `${process.env.REACT_APP_ID_CONTRACT}`,
              idDocument,
            }),
          }).then(function (response) {
            return response.data.result;
          });
        })
      );
      setResultValue(result);
      setLoadingValue(false);
    } catch (error) {
      alert("Ocorreu um erro na requisição");
      console.log(error);
      setResultValue(result);
      setLoadingValue(false);
    }
  };

  return (
    <>
      <form className="form-inline" onSubmit={(e) => search(e)}>
        <Card style={{ width: "117%", marginLeft: "-5%" }}>
          <Card.Body>
            <Row className="m-1">
              <label>Buscar por:</label>
              <Col>
                <Form.Select aria-label="Default select example">
                  <option value="id">Id</option>
                  <option value="origin">Origem</option>
                  <option value="event">Evento</option>
                </Form.Select>
              </Col>
              <Col>
                <input
                  type="text"
                  name="code"
                />
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

      {loadingValue && (
        <Col>
          <Spinner
            animation="border"
            size="lg"
            role="status"
            style={{
              marginTop: "20%",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <br />
          <br />
          <label>
            <b>Recuperando da Blockchain…</b>
          </label>
        </Col>
      )}
      {resultValue.map((result) => {
        return (
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
                <Col align="left" style={{ width: "50%" }}>
                  <Row>
                    <label>
                      <b>Origem</b>
                    </label>
                    <text
                      type="text"
                      className="ubuntu-light"
                      style={{ marginBottom: "3%" }}
                    >
                      {result.document.name}
                    </text>
                  </Row>
                  <Row>
                    <label>
                      <b>Nome do Evento</b>
                    </label>
                    <text type="text" 
                    className="ubuntu-light"
                    style={{ marginBottom: "3%" }}
                    >
                      {result.document.event}
                    </text>
                  </Row>
                  <Row>
                    <label>
                      <b>Descrição</b>
                    </label>
                    <text
                      type="text"
                      className="ubuntu-light"
                      style={{ marginBottom: "3%" }}
                    >
                      {result.document.description}
                    </text>
                  </Row>
                  <Row>
                    <label>
                      <b>Data do Evento</b>
                    </label>
                    <text
                      type="text"
                      className="ubuntu-light"
                      style={{ marginBottom: "3%" }}
                    >
                      {result.document.date}
                    </text>
                  </Row>
                  <Row>
                    <label>
                      <b>Créditos</b>
                    </label>
                    <text
                      type="text"
                      className="ubuntu-light"
                      style={{ marginBottom: "3%" }}
                    >
                      {result.document.credit}
                    </text>
                  </Row>
                </Col>
                <Col align="center" style={{ width: "50%" }}>
                  <img
                    src={
                      "https://ipfs.infura.io/ipfs/" +
                      result.document.idInternal
                    }
                    width={'100%'}
                    height={'55%'}
                  />
                  <Card style={{ marginTop: "5%", alignItems: "center" }}>
                    <label>
                      <b>BLOCKCHAIN</b>
                    </label>
                    <label style={{ marginTop: "3%" }}>TRANSAÇÃO</label>
                    <label style={{ width: 300 }} className="ubuntu-light">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={
                          "https://mumbai.polygonscan.com/tx/" +
                          result.transactionId
                        }
                      >
                        {result.transactionId}
                      </a>
                    </label>
                    <label style={{ marginTop: "3%" }}>TIMESTAMP</label>
                    <label className="ubuntu-light">{result.timestamp}</label>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
