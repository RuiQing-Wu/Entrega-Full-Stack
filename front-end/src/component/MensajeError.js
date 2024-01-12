import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, gravedad }) => {
  const variant = gravedad || 'danger';
  return (
    <Alert key={variant} variant={variant}>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
