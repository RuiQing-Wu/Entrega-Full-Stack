import React from 'react';
import { Form, Button, Stack } from 'react-bootstrap';

export default function Busqueda({
  titulo,
  handleBuscar,
  handleBusquedaInput,
  error,
  busqueda,
}) {
  return (
    <div className="mb-4">
      <h1>Buscar {titulo}</h1>
      <Form onSubmit={handleBuscar}>
        <div>
          <label htmlFor="busqueda" className="form-label">
            Nombre de la {titulo}
          </label>
          <input
            type="text"
            className="form-control"
            id="busqueda"
            placeholder="Buscar ..."
            value={busqueda}
            onChange={handleBusquedaInput}
          />
          <label>{error}</label>
        </div>
        <Button type="submit" className="btn btn-primary">
          Buscar {titulo}
        </Button>
      </Form>
    </div>
  );
}
