import './Error.css';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Please try again later or contact us at <a href="@um.es"> um.es </a>
      </p>
    </div>
  );
}
