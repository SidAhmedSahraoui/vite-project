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
import Interviews from "./pages/interviews";
import InterviewShow from "./pages/interviews/interviewShow";
import Profile from "./pages/profile";
import CategoryProviders from "./pages/interviews/categoryProvider";
import BookingPage from "./pages/booking";
import Planning from "./pages/provider";
import ClientAppointments from "./pages/appointments/client";
import ProviderAppointments from "./pages/appointments/provider";
import Payment from "./pages/payment";
import Admin from "./pages/admin";

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/interviews/:id" element={<InterviewShow />} />
              <Route
                path="/interviews/:id/providers"
                element={<CategoryProviders />}
              />
              <Route
                path="/appointments/client"
                element={<ClientAppointments />}
              />
              <Route path="/dashboard/*" element={<Admin />} />
              <Route path="/appointments" element={<ProviderAppointments />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Provider>
      </Router>
    </>
  );
}

export default App;
