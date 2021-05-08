import { Redirect, Route, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = {
    isAuth: boolean;
    authPath: string;
} & RouteProps;

export default function ProtectedRoute({isAuth, authPath, ...routeProps}: ProtectedRouteProps) {
    if(isAuth) return <Route {...routeProps} />;
    return <Redirect to={{ pathname: authPath }} />;
};