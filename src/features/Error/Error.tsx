import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import ErrorLayout from "../../components/General/ErrorLayout";

interface ErrorProps {
  code?: number;
  message?: string;
}

export default function Error({ code, message }: ErrorProps) {
  const routeError = useRouteError();

  // Triggered via router errorElement
  if (routeError) {
    if (isRouteErrorResponse(routeError)) {
      return (
        <ErrorLayout code={routeError.status} message={routeError.statusText} />
      );
    }

    return <ErrorLayout code={500} message="Something went wrong" />;
  }

  // If used manually
  return (
    <ErrorLayout code={code ?? 404} message={message ?? "Page not found"} />
  );
}
