import React, { useState, useEffect } from 'react';
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
  const [valueInput, setValueInput] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    handleBuscar(valueInput, filtro);
  };

  useEffect(() => {
    setValueInput('');
  }, [filtro]);

  const onFiltroChange = (event) => {
    const nuevoFiltro = event.target.value;
    setFiltro(nuevoFiltro);
  };

  const onInputChange = (event) => {
    const inputValue = event.target.value;
    setValueInput(inputValue);
    switch (filtro) {
      case 'nombre':
        setNombre(inputValue);
        handleNombreInput(inputValue);
        break;
      case 'categoria':
        setCategoria(inputValue);
        handleCategoriaInput(inputValue);
        break;
      case 'year':
        setYear(inputValue);
        handleYearInput(inputValue);
        break;
      case 'numApoyo':
        setNumApoyo(inputValue);
        handleNumApoyoInput(inputValue);
        break;
      default:
        break;
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
            {filtro !== 'categoria' && (
              <input
                type={
                  filtro === 'year' || filtro === 'numApoyo' ? 'number' : 'text'
                }
                className="form-control"
                id="busqueda"
                placeholder={`Buscar ${titulo} por ${filtro}...`}
                onChange={onInputChange}
                value={valueInput}
              />
            )}
            {filtro === 'categoria' && (
              <Form.Select
                value={categoria}
                onChange={onInputChange}
                className="form-control"
              >
                <option value="medio ambiente">Medio ambiente</option>
                <option value="salud">Salud</option>
                <option value="desarrollo social">Desarrollo social</option>
                <option value="educacion">Educación</option>
                <option value="derechos humanos">Derechos humanos</option>
                <option value="infancia">Infancia</option>
              </Form.Select>
            )}
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
