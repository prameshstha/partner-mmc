import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { checkAllKeysHasValues } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestOtp } from "@/feature/auth/authAPI";
import { setEmailOtpSent } from "@/feature/auth/authSlice";
import { statusCode } from "@/utils/constant";

const EmailInput = ({ setStep }) => {
  const [email, setEmail] = useState({});
  const authStore = useSelector((state) => state.authStore);
  const state = authStore.state;
  const [disableButton, setDisableButton] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const updatedEmail = {
      ...email,
      [e.target.name]: e.target.value.trimStart(),
    };

    setEmail(updatedEmail);
    const keys = ["email"];
    const allKeysExistAndHaveValues = checkAllKeysHasValues(keys, updatedEmail);
    setDisableButton(!allKeysExistAndHaveValues);
  };
  const requestOtpHander = async () => {
    dispatch(requestOtp(email)).then((data) => {
      if (data.payload) {
        dispatch(setEmailOtpSent(data.payload));
        setStep("otp");
      }
    });
  };
  const inputClasses =
    "focus-visible:ring-transparent focus-visible:border-primary border-shadeColor";
  return (
    <div className="rounded-md max-h-lvh">
      <div className="grid gap-4 py-0">
        <Card className="py-10 border-shadeColor">
          <CardContent className="space-y-8 ">
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-primary">
                  Welcome To Partner Portal
                </h1>
                <p className="mt-2 text-sm text-gray-primary">
                  Login/Register to access your MMC accout.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="email">Email</label>
              <Input
                className={inputClasses}
                id="email"
                placeholder="name@example.com"
                required
                type="email"
                name="email"
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
              onClick={requestOtpHander}
              disabled={disableButton}
            >
              {authStore.state === statusCode.LOADING ? (
                <>...sending OTP</>
              ) : (
                <> Send Email OTP</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EmailInput;
