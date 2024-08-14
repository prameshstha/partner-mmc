import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { registerUserAndLogin } from "@/feature/auth/authAPI";
// import { saveCurrentToken } from "@/feature/auth/authSlice";
import { checkAllKeysHasValues } from "@/utils/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const RegisterWithOtp = ({ setOpenLoginModal }) => {
  const inputClasses =
    "focus-visible:ring-transparent focus-visible:border-primary";
  const authStore = useSelector((state) => state.authStore);
  const [userDetails, setUserDetails] = useState({ email: authStore.email });
  const [disableButton, setDisableButton] = useState(true);
  const [tncMessage, setTncMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value.trimStart();
    if (
      e.target.name === "tnc_pp_agreement" ||
      e.target.name === "marketing_comms_agreement"
    ) {
      value = e.target.checked;
    }
    const updatedUserDetails = {
      ...userDetails,
      [e.target.name]: value,
    };
    if (updatedUserDetails.tnc_pp_agreement) setTncMessage("");
    setUserDetails(updatedUserDetails);
    const keys = ["phone", "firstname", "lastname"];
    const allKeysExistAndHaveValues = checkAllKeysHasValues(
      keys,
      updatedUserDetails
    );

    setDisableButton(!allKeysExistAndHaveValues);
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    if (!userDetails.tnc_pp_agreement) {
      setTncMessage("Agree to proceed!");
      return;
    }
    dispatch(registerUserAndLogin(userDetails)).then((data) => {
      if (data.payload) {
        dispatch(saveCurrentToken(data.payload.token));
        if (!data.error) setOpenLoginModal(false);
      }
    });
  };
  return (
    <div className="flex items-center justify-center bg-white border border-shadeColor rounded-md p-2">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <div className="text-gray-500">
            <div className="font-bold">Register</div>
            Create your account to access all our features.
          </div>
        </div>
        <div className="space-y-4 text-left">
          <div className="flex justify-between space-x-3 ">
            <div className="w-1/2">
              <span htmlFor="firstname">Firstname</span>
              <Input
                className={inputClasses}
                id="firstname"
                name="firstname"
                placeholder="Enter your firstname"
                required
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-1/2">
              <span htmlFor="lastname">Lastname</span>
              <Input
                className={inputClasses}
                id="lastname"
                name="lastname"
                placeholder="Enter your lastname"
                required
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span htmlFor="email">Email address</span>
            <span className="flex h-10 w-full rounded-md border border-neutral-200 bg-borderColor px-3 py-2 text-sm">
              {authStore.email}
            </span>
          </div>
          <div>
            <span htmlFor="phone">Phone</span>
            <Input
              className={inputClasses}
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              type="number"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <span htmlFor="dob">Date of Birth</span>
            <Input
              className={inputClasses}
              id="dob"
              name="dob"
              placeholder="Enter your dob"
              required
              type="date"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="">
            <div className="flex gap-2 items-center">
              <input
                id="tnc"
                name="tnc_pp_agreement"
                required
                type="checkbox"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <span className="w-full text-xs">
                I agree to Terms and conditions and Privacy policy.
                <span className="text-red"> {tncMessage}</span>
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="marketing"
                name="marketing_comms_agreement"
                type="checkbox"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <span className="w-full text-xs">
                I would like to hear about offers, events or any information.
              </span>
            </div>
          </div>
          <Button
            className="w-full bg-primary text-gray-primary hover:bg-primary-dark hover:text-gray"
            disabled={disableButton}
            onClick={registerHandler}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWithOtp;
