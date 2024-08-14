import { RequestOtpLoginRegister } from "@/components";
import CustomModal from "../CustomModal";

const OtpLoginRegisterModal = ({ setOpenLoginModal, openLoginModal }) => {
  return (
    <CustomModal
      openLoginModal={openLoginModal}
      setOpenLoginModal={setOpenLoginModal}
    >
      <RequestOtpLoginRegister setOpenLoginModal={setOpenLoginModal} />
    </CustomModal>
  );
};

export default OtpLoginRegisterModal;
