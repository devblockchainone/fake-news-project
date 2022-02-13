/* eslint-disable react/style-prop-object */
import React, { useRef, useState } from "react";
import { Card, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import services from "../utils/services";
import {firestore} from "../utils/firebase";
import axios from "axios";
var ipfsAPI = require("ipfs-api");

export default function Register() {
  const [fileValue, setFileValue] = useState(null);
  const [loadingValue, setLoadingValue] = useState(false);
  const [resultValue, setResultValue] = useState(null);
  const inputFile = useRef(null);

  const onChange = (e) => {
    var file = e.target.files[0];
    services.getBase64(file)
      .then((data) => setFileValue(data));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoadingValue(true)
    var ipfs = ipfsAPI({
      host: `${process.env.REACT_APP_HOST_IPFS}`,
      port: `${process.env.REACT_APP_PORT_IPFS}`,
      protocol: "https",
    });

    // gravação do ipfs.
    ipfs.files.add(Buffer.from(fileValue), async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("upload is successful", result[0].path);
      const token = await services.getAcessToken();
      axios({
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: token },
        url: `${process.env.REACT_APP_URL_DOCSTONE}/documents`,
        data: JSON.stringify({
          idContract: `${process.env.REACT_APP_ID_CONTRACT}`,
          value: [
            result[0].path,
            result[0].path,
            e.target.elements[0].value,
            e.target.elements[1].value,
            e.target.elements[2].value,
            e.target.elements[3].value,
            e.target.elements[6].value,
          ],
        }),
      }).then(async function(response) {
        var idDocument = response.data.result.idDocument;
        setResultValue(idDocument);

        await firestore.collection('register').doc(idDocument).set({
          'id': idDocument,
          'origin': e.target.elements[0].value,
          'event': e.target.elements[1].value,
          'description': e.target.elements[2].value,
          'date': e.target.elements[3].value,
          'credits': e.target.elements[6].value,
        });

        setLoadingValue(false)
      });
    });
  };

  return (
    <>
      {loadingValue && (
        <Spinner
          animation="border"
          size="lg"
          role="status"
          style={{
            marginTop: "20%",
            marginLeft: "45%",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {!loadingValue && (
        <form className="form-inline" onSubmit={(e) => submit(e)}>
          {resultValue !== null && (
            <Alert variant="success">
              Registro gravado com sucesso com ID: {resultValue}
            </Alert>
          )}
          <Card style={{ width: "rem" }}>
            <Card.Body>
              <Row className="m-3">
                <label>
                  <b>Origem:</b>
                </label>
                <input required type="text" name="origin" />
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
      )}
    </>
  );
}
