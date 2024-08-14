import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { checkAllKeysHasValues } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateOtpAndLogin } from "@/feature/auth/authAPI";
import { saveCurrentToken, setEmailOtpSent } from "@/feature/auth/authSlice";
import { statusCode } from "@/utils/constant";

const OtpInput = ({ setStep }) => {
  const authStore = useSelector((state) => state.authStore);
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    email: authStore.email,
    hash: authStore.hash,
  });
  const state = authStore.state;
  const [disableButton, setDisableButton] = useState(true);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const updatedOtp = {
      ...otp,
      code: e.target.value.trimStart(),
    };
    setOtp(updatedOtp);
    const keys = ["code"];
    const allKeysExistAndHaveValues = checkAllKeysHasValues(keys, updatedOtp);
    setDisableButton(!allKeysExistAndHaveValues);
  };
  const validateOtpHander = async () => {
    dispatch(validateOtpAndLogin(otp)).then((data) => {
      if (data.payload) {
        if (data.payload[0] === "register") {
          setStep("register");
        }
        if (data.payload[0] === "login") {
          dispatch(saveCurrentToken(data.payload[1].token));
          if (!data.error) navigate("/");
        }
        dispatch(setEmailOtpSent(otp));
        // setStep("otp");
      }
    });
  };
  const inputClasses =
    "focus-visible:ring-transparent focus-visible:border-primary border-shadeColor";
  return (
    <div className="rounded-md max-h-lvh w-full">
      <div className="grid gap-4 py-0">
        <Card className="py-10 border-shadeColor">
          <CardContent className="space-y-8">
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-primary">
                  Enter you OTP
                </h1>
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="otp">OTP</label>
              <Input
                className={inputClasses}
                id="otp"
                required
                type="text"
                name="otp"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary text-gray-900 hover:bg-[#d99c07] focus:ring-primary"
              type="submit"
              onClick={validateOtpHander}
              disabled={disableButton}
            >
              {authStore.state === statusCode.LOADING ? (
                <>...validating OTP</>
              ) : (
                <> Validate OTP</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OtpInput;
