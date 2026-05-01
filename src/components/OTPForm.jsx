import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function OTPForm({ mobile, otpData }) {
  const { mutate, isPending } = useLogin();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = e.target.otp.value;

    if (enteredOtp === otpData) {
      mutate(mobile, {
        onSuccess: (res) => {
          login(res.data);
          navigate("/");
        },
        onError: () => navigate("/register"),
      });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>

        {/* OTP Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Enter OTP</label>
          <input
            name="otp"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default OTPForm;
