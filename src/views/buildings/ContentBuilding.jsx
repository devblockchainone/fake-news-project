/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { ButtonGroup, ToggleButton, Col } from "react-bootstrap";
import Register from '../../views/Register';
import Search from '../../views/Search';

const radios = [
    { name: 'Registrar Imagem', value: '1' },
    { name: 'Buscar Imagem', value: '2' }
  ];

  export default function ContentBuilding() {

    const [radioValue, setRadioValue] = useState('1');

    return (
    <Col align="center" className="ContentLandBuilding">
        <ButtonGroup className="mb-2" style={{paddingTop: '50px', border: 100}}>
                {radios.map((radio, idx) => (
                <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={(radioValue === radio.value) ? 'dark' : 'light'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>

            <div className="contentBackground">
                <div className="positionContentText">
                    {(radioValue ==='1' 
                    ?
                    <Register/>
                    :
                    <Search/>
                    )}
                </div>
            </div>
    </Col>    
    )
  }