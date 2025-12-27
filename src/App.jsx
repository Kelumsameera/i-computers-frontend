import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import TestPage from "./pages/testPage";


function App() {
  return (
    <GoogleOAuthProvider clientId="931730928606-v0jklvt6m9emklighmi6pe1j8ecoh34a.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="w-full h-screen">
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            
            <Route path="test" element={<TestPage />} />
            <Route path="/*" element={<h1>Page not found</h1>} />
          </Routes>
          {/*  */}
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
//931730928606-v0jklvt6m9emklighmi6pe1j8ecoh34a.apps.googleusercontent.com