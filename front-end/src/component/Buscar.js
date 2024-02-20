import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Busqueda({
  titulo,
  handleBuscar,
  handleNumApoyoInput,
  handleNombreInput,
  handleCategoriaInput,
  handleYearInput,
  error,
}) {
  const [filtro, setFiltro] = useState('nombre');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [numApoyo, setNumApoyo] = useState('');
  const [year, setYear] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (filtro === 'nombre') {
      handleBuscar(nombre, filtro);
    } else if (filtro === 'categoria') {
      handleBuscar(categoria, filtro);
    } else if (filtro === 'year') {
      handleBuscar(year, filtro);
    } else if (filtro === 'numApoyo') {
      handleBuscar(numApoyo, filtro);
    }
  };

  const onFiltroChange = (event) => {
    const nuevoFiltro = event.target.value;
    setFiltro(nuevoFiltro);
  };

  const onInputChange = (event) => {
    const inputValue = event.target.value;
    if (filtro === 'nombre') {
      setNombre(inputValue);
      handleNombreInput(inputValue);
    } else if (filtro === 'categoria') {
      setCategoria(inputValue);
      handleCategoriaInput(inputValue);
    } else if (filtro === 'year') {
      setYear(inputValue);
      handleYearInput(inputValue);
    } else if (filtro === 'numApoyo') {
      setNumApoyo(inputValue);
      handleNumApoyoInput(inputValue);
    }
  };

  return (
    <div className="container mb-4">
      <Form onSubmit={onSubmit}>
        <Row className="d-flex flex-wrap">
          <Col xs={12} md={8} lg={2} className="p-1">
            <Form.Group controlId="filtroSelect">
              <Form.Select value={filtro} onChange={onFiltroChange}>
                <option value="nombre">Filtrar por nombre</option>
                {titulo === 'comunidades' && (
                  <option value="categoria">Filtrar por categoría</option>
                )}
                {titulo === 'comunidades' && (
                  <option value="year">Filtrar por año</option>
                )}
                {titulo === 'causas' && (
                  <option value="numApoyo">Filtrar por número de apoyo</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={6} className="p-1">
            <input
              type="text"
              className="form-control"
              id="busqueda"
              placeholder={`Buscar ${titulo} por ${filtro}...`}
              onChange={onInputChange}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="p-1">
            <Button type="submit" className="btn btn-primary">
              Buscar {titulo}
            </Button>
          </Col>
        </Row>
      </Form>
      {<label className="mt-3">{error}</label>}
    </div>
  );
}
