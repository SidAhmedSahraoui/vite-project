import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// Components
import Navbar from "./components/navbar";

// Utils
import ScrollToTop from "./utils/scrollToTop";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Toast
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import InterviewShow from "./pages/interviews/interviewShow";
import Profile from "./pages/profile";
import CategoryProviders from "./pages/interviews/categoryProvider";
import BookingPage from "./pages/booking";
import Planning from "./pages/provider";
import ClientAppointments from "./pages/appointments/client";
import ProviderAppointments from "./pages/appointments/provider";
import Payment from "./pages/payment";
import Admin from "./pages/admin";
import { PrivateRoute } from "./routes/privateRoute";
import Services from "./pages/services";
import Categories from "./pages/interviews/categories";
import About from "./pages/about";
import Help from "./pages/help";
import Domains from "./pages/interviews/domains";
import Study from "./pages/interviews/categories/study";
import Local from "./pages/interviews/categories/study/local";
import Inter from "./pages/interviews/categories/study/inter";

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <Toaster />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={<PrivateRoute component={Profile} />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/interviews" element={<Categories />} />
              <Route path="/interviews/study" element={<Study />} />
              <Route path="/interviews/local" element={<Local />} />
              <Route path="/interviews/inter" element={<Inter />} />
              <Route path="/interviews/:id" element={<Domains />} />
              {/*<Route path="/interviews/:id" element={<Domains />} />*/}
              <Route path="/interviews/show/:id" element={<InterviewShow />} />
              <Route
                path="/interviews/:id/providers"
                element={<CategoryProviders />}
              />
              <Route
                path="/appointments/client"
                element={<PrivateRoute component={ClientAppointments} />}
              />
              <Route
                path="/dashboard/*"
                element={<PrivateRoute component={Admin} />}
              />
              <Route
                path="/appointments"
                element={<PrivateRoute component={ProviderAppointments} />}
              />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route
                path="/planning"
                element={<PrivateRoute component={Planning} />}
              />
              <Route
                path="/payment/:id"
                element={<PrivateRoute component={Payment} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Provider>
      </Router>
    </>
  );
}

export default App;
