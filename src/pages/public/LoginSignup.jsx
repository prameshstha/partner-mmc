import { EmailInput, OtpInput, RegisterWithOtp } from "@/components";
import { useState } from "react";

const LoginSignup = () => {
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
    <div className=" flex justify-center w-full p-5 sm:p-20 max-sm:py-20">
      <div className="w-96 sm:w-3/5 flex justify-center">
        {step === "email" && <EmailInput setStep={setStep} />}
        {step === "otp" && <OtpInput setStep={setStep} />}
        {/* {step === "register" && (
          <RegisterWithOtp
            setStep={setStep}
            setOpenLoginModal={setOpenLoginModal}
          />
        )} */}
        {/* {step === "login" && <Login userDetails={userDetails} />} */}
      </div>
    </div>
  );
};

export default LoginSignup;
