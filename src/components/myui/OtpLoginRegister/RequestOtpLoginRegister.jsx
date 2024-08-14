import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { checkAllKeysHasValues } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { requestOtp } from "@/feature/auth/authAPI";
// import { setEmailOtpSent } from "@/feature/auth/authSlice";
import { statusCode } from "@/utils/constant";
import EmailInput from "./EmailInput";
import OtpInput from "./OtpInput";
import RegisterWithOtp from "./RegisterWithOtp";

const RequestOtpLoginRegister = ({ setOpenLoginModal }) => {
  const [step, setStep] = useState("email"); // 'email', 'otp', 'register', 'login'
  const [userDetails, setUserDetails] = useState(null);

  const handleOTPSubmit = (otp) => {
    // Logic to validate OTP
    const response = validateOTP(otp); // Mock function
    if (response.status === "valid") {
      if (response.userDetails) {
        setUserDetails(response.userDetails);
        setStep("login");
      } else {
        setStep("register");
      }
    } else {
      // Handle invalid/expired OTP
      setStep("otp");
    }
  };

  const handleRegistrationComplete = (newUserDetails) => {
    setUserDetails(newUserDetails);
    setStep("login");
  };
  return (
    <div className="">
      {step === "email" && <EmailInput setStep={setStep} />}
      {step === "otp" && (
        <OtpInput setStep={setStep} setOpenLoginModal={setOpenLoginModal} />
      )}
      {step === "register" && (
        <RegisterWithOtp
          setStep={setStep}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
      {/* {step === "login" && <Login userDetails={userDetails} />} */}
    </div>
  );
};

export default RequestOtpLoginRegister;
