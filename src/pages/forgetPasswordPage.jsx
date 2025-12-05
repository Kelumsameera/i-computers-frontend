import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loder";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function resetPassword() {
        if (!otp) {
            toast.error("Enter OTP");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/users/validate-otp",
                {
                    email: email,
                    otp: otp,
                    newPassword: newPassword,
                }
            );

            toast.success("Password reset successful");
            navigate("/login");
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Error resetting password");
        }
        setLoading(false);
    }

    async function sendOtp() {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);
        try {
            await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email
            );

            toast.success("OTP sent to your email");
            setOtpSent(true);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Error sending OTP");
        }
        setLoading(false);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {loading && <Loader />}

            {otpSent ? (
                <div className="w-[400px] h-[500px] flex flex-col justify-center bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Enter OTP & New Password
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-300 rounded"
                    />

                    <button
                        onClick={resetPassword}
                        className="w-full bg-blue-500 text-white p-3 rounded font-semibold hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </div>
            ) : (
                <div className="w-[400px] h-[400px] flex flex-col justify-center bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Reset Your Password
                    </h2>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-300 rounded"
                    />

                    <button
                        onClick={sendOtp}
                        className="w-full bg-blue-500 text-white p-3 rounded font-semibold hover:bg-blue-600"
                    >
                        Send OTP
                    </button>
                </div>
            )}
        </div>
    );
}
