import "./App.css";
import { Layout } from "./components";
import { Route, Routes } from "react-router-dom";
import { Dashboard, LoginSignup } from "./pages";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer, cssTransition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { api_url } from "./utils/constant";
import { PrivateRoute, PublicRoute } from "./components/route/Route";
import { getFromStorage } from "./utils/utils";
import setAuthToken from "./utils/setAuthToken";
import { saveCurrentToken, saveCurrentUser } from "./feature/auth/authSlice";

function App() {
  const fadeTransition = cssTransition({
    enter: "animate__animated animate__fadeInRight",
    exit: "animate__animated animate__fadeOutRight",
  });
  const token = getFromStorage("partner_token");
  const user = getFromStorage("partner_user");
  if (token && user) {
    setAuthToken(token);
    store.dispatch(saveCurrentUser(user, token));
    store.dispatch(saveCurrentToken(token));
  }

  axios.defaults.baseURL = api_url;
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          transition={fadeTransition}
        />
        <Layout>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/signin" element={<LoginSignup />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
