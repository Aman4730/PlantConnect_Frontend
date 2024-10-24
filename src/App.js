import React, { useContext } from "react";
import Home from "./Home/index";
import Auth from "./Components/Auth";
import Layout from "./Components/Layout";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import NoInternet from "./Pages/Network/Network";
import RequireAuth from "./Components/Auth/RequireAuth";
import UseNetworkStatus from "./context/UseNetworkStatus";
import PersistLogin from "./Components/Auth/PersistLogin";
import PosterCard from "./Components/PosterCard/PosterCard";
import Notification from "./Pages/Notification/Notification";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Unauthorized from "./Components/Auth/Unauthorize/Unauthorized";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SPPage from "./Pages/DhoChoPage";
import SecureLS from "secure-ls";
import SLARequestApp from "./Pages/SLARequestApp";
import SPAppraisal from "./Pages/SPAppraisal";
import CookieConsent from "react-cookie-consent";
import JDPage from "./Pages/JDPage";
import NodalDir from "./Pages/NodalDir";
import OrderList from "./Pages/OrderList";

const ROLES = {
  HMT: "HMT",
  JD: "JD",
  DHO: "DHO/CHO",
  Nodal: "Nodal",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#16b566",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
  },
});

const App = () => {
  const { pathname } = useLocation();
  const authPaths = ["/login"];
  const { isOnline } = UseNetworkStatus();
  const isAuthRoute = authPaths.includes(pathname);
  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      // console.error("Could not parse JSON", error);
      ls.remove("authToken");
    }
    return token;
  };

  const tokenData = fetchToken();
  const userRole = tokenData?.data.user_role;
  const isAuthenticated = !!tokenData;
  const roleBasedRedirect = (userRole) => {
    switch (userRole) {
      case ROLES.HMT:
        return "/hmt";
      case ROLES.JD:
        return "/jd";
      case ROLES.DHO:
        return "/dho&cho";
      case ROLES.Nodal:
        return "/nodal";
      default:
        return "/home";
    }
  };

  const handleDecline = () => {
    document.cookie =
      "myAwesomeCookie=declined; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  };

  return (
    <ThemeProvider theme={theme}>
      {isAuthRoute ? (
        <React.Fragment>
          <NavBar />
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route path="/login" element={<Auth />} /> */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to={roleBasedRedirect(userRole)} replace />
                  ) : (
                    <Auth />
                  )
                }
              />
              {/* <Route path="/signup" element={<Auth />} /> */}
            </Route>
          </Routes>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {isOnline ? (
            <React.Fragment>
              <NavBar />
              <PosterCard />
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* public routes */}

                  <Route path="unauthorized" element={<Unauthorized />} />
                  <Route path="/orderList" element={<OrderList />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />

                  {/* we want to protect these routes */}
                  <Route element={<PersistLogin />}>
                    <Route
                      element={
                        <RequireAuth allowedRoles={[ROLES.HMT, ROLES.Nodal]} />
                      }
                    >
                      <Route path="/notification" element={<Notification />} />
                    </Route>
                    <Route
                      element={
                        <RequireAuth allowedRoles={[ROLES.DHO, ROLES.JD]} />
                      }
                    >
                      <Route path="/spAppraisal" element={<SPAppraisal />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.HMT]} />}>
                      <Route path="/hmt" element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.JD]} />}>
                      <Route path="/jd" element={<JDPage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.DHO]} />}>
                      <Route path="/dho&cho" element={<SPPage />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Nodal]} />}>
                      <Route path="/nodal" element={<NodalDir />} />
                      <Route path="/requestSla" element={<SLARequestApp />} />
                    </Route>
                  </Route>
                  {/* catch all */}
                  {userRole && (
                    <Route
                      path="/home"
                      element={
                        <Navigate to={roleBasedRedirect(userRole)} replace />
                      }
                    />
                  )}
                  {!userRole && <Route path="/home" element={<Home />} />}
                  <Route
                    path="/"
                    element={
                      <Navigate to={roleBasedRedirect(userRole)} replace />
                    }
                  />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Route>
              </Routes>
              <Footer />
              <CookieConsent
                location="bottom"
                buttonText="Accept All Cookies"
                cookieName="myAwesomeCookie"
                expires={365}
                enableDeclineButton
                declineButtonText="Customize Settings"
                onDecline={handleDecline}
                declineButtonStyle={{
                  marginLeft: "10px",
                  color: "#fff",
                  backgroundColor: "#384150",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px 20px",
                }}
                buttonStyle={{
                  backgroundColor: "#10b982",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                style={{
                  background: "#333333",
                  color: "#fff",
                  padding: "20px 10px 20px 10px",
                }}
              >
                This website uses cookies to ensure you get the best experience
                on our website.
              </CookieConsent>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NoInternet />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </ThemeProvider>
  );
};

export default App;
