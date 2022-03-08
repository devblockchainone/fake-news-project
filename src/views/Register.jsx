/* eslint-disable react/style-prop-object */
import React, { useRef, useState } from "react";
import { Card, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import services from "../utils/services";
import {firestore} from "../utils/firebase";
import axios from "axios";
var ipfsAPI = require("ipfs-api");

export default function Register() {
  const [fileValue, setFileValue] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loadingValue, setLoadingValue] = useState(false);
  const [resultValue, setResultValue] = useState(null);
  const inputFile = useRef(null);

  const onChange = (e) => {
    var file = e.target.files[0];
    if (file === undefined) {
      return;
    }
    setFileName(file.name);
    services.getBase64(file)
      .then((data) => setFileValue(data));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
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
        setFileValue(null)
      });
    });
  } catch (error) {
    alert("Ocorreu um erro na requisição");
    console.log(error);
    setLoadingValue(false)
    setFileValue(null)
  }
  };

  return (
    <>
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
        <br /><br />
        <label>
          <b>Registrando em Blockchain…</b>
        </label>
      </Col>
      )}

      {!loadingValue && (
        <form className="form-inline" onSubmit={(e) => submit(e)}>
          {resultValue !== null && (
            <Alert variant="success">
              <h5 className="alert-heading"><b>Notícia registrada com sucesso!</b></h5>
              <p>
                Para realizar a busca você pode usar o ID desse registro:
              </p>
              <p>
              <b>{resultValue}</b>
              </p>
            </Alert>
          )}
          <Card style={{ width: "rem" }}>
            <Card.Body>
              <Row className="m-3">
                <label style={{marginLeft:'-43%'}}>
                  <b>Origem</b>
                </label>
                <input required type="text" name="origin" placeholder="Ex. CNN, New York Times, Globo" />
              </Row>
              <Row className="m-3">
              <label style={{marginLeft:'-35%'}}>
                  <b>Nome do Evento</b>
                </label>
                <input type="text" name="name" placeholder="Ex. Annual Wlliamsburg Walk"/>
              </Row>
              <Row className="m-3">
              <label style={{marginLeft:'-41%'}}>
                  <b>Descrição</b>
                </label>
                <textarea required type="text" name="description" placeholder="Informe detalhes do evento."/>
              </Row>
              <Row className="m-2">
                <Col style={{ width: "50%" }}>
                  <label style={{marginLeft:'-40%'}}>
                    <b>Data do Evento</b>
                    <input style={{marginLeft:'21%'}} required type="date" name="date" />
                  </label>
                </Col>
                <Col style={{ width: "50%" }}>
                  <label>
                    <b>Imagem</b>
                  </label>
                  { (fileValue != null) &&
                  <>
                    <label style={{ width: 200 }}>
                      {fileName}
                    </label>
                    <br /><br />
                  </>
                  }
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
                        {(fileValue == null)? "Upload" : "Recarregar"}
                      </Button>
                    </div>
                </Col>
              </Row>
              <Row className="m-3">
                <label style={{marginLeft:'-34%'}}>
                  <b>Créditos Imagem</b>
                </label>
                <textarea required type="text" name="credit"
                 placeholder="O crédito à(s) pessoa(s) e/ou organização(ções) exigidos pelo fonercedor da imagem a ser utilizada que publica"/>
              </Row>

              <br />
              <br />
              <Button
                type="submit"
                variant="dark"
                size="lg"
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
