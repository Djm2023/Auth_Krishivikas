import { useSendOTP } from "../hooks/useSendOTP";

function LoginForm({ setMobile, setOtpData }) {
  const { mutate, isPending, isError } = useSendOTP();

  const handleSubmit = (e) => {
    e.preventDefault();

    const mobile = e.target.mobile.value.trim();
    if (!mobile) return;

    setMobile(mobile);

    mutate(mobile, {
      onSuccess: (res) => {
        const otp = res.data.result.response.otp;
        setOtpData(otp);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        {/* Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
          <input
            name="mobile"
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isPending ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Error */}
        {isError && (
          <p className="text-red-500 text-sm mt-4 text-center">Failed to send OTP</p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
