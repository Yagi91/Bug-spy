import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error: any = useRouteError();

  console.log(error);

  return (
    <section>
      <h1>There was an error</h1>
      <p>{error?.message}</p>
    </section>
  );
};

export default ErrorBoundary;
