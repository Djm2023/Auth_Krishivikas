import { useState } from "react";
import LoginForm from "./LoginForm";
import OTPForm from "./OTPForm";

function LoginContainer() {
  const [mobile, setMobile] = useState("");
  const [otpData, setOtpData] = useState(null);

  return (
    <div>
      {!otpData ? (
        <LoginForm setMobile={setMobile} setOtpData={setOtpData} />
      ) : (
        <OTPForm mobile={mobile} otpData={otpData} />
      )}
    </div>
  );
}

export default LoginContainer;
