import { ComponentType, useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getInformation } from '../utils/siweAuth';

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<any>;
}

// Define the PrivateRoute component
function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use an effect to check authentication status when the component mounts
  useEffect(() => {
    const checkAuthentication = async () => {
      console.log("Checking authentication...");
      console.log(await getInformation());
      setIsAuthenticated(await getInformation() !== "");
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        // If isAuthenticated is true, render the Component
        // If isAuthenticated is false, redirect to the login page
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

// Export the PrivateRoute component
export default PrivateRoute;