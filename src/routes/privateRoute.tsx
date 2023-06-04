import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  if (isAuthenticated) {
    return <RouteComponent />;
  }

  return <Navigate to="/" />;
};
