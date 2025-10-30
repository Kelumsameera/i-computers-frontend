import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./components/test";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="w-full h-screen">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
