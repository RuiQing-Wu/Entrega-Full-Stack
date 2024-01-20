import './Error.css';
import { useLocation, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error code has occurred.</p>
      <p>
        Please try again later or contact us at <a href="@um.es"> um.es </a>
      </p>
    </div>
  );
}
