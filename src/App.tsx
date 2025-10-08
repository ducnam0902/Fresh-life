import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Loading from "./components/Loading";
import useLoading from "./store/useLoading";
import routes from "./utils/routes";
import PrivateRoute from "./components/PrivateRoute";
import BaseLayout from "./components/BaseLayout";

const SignIn = React.lazy(() => import("./pages/SignIn"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Expenses = React.lazy(() => import("./pages/Expenses"));
const Tasks = React.lazy(() => import("./pages/Tasks"));
const Charts = React.lazy(() => import("./pages/Charts"));

function App() {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.signIn} element={<SignIn />} />
        <Route element={<BaseLayout />}>
          <Route
            path={routes.dashboard}
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.expenses}
            element={
              <PrivateRoute>
                <Expenses />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.tasks}
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.charts}
            element={
              <PrivateRoute>
                <Charts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
