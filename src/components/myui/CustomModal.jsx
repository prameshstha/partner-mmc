const CustomModal = ({ openLoginModal, setOpenLoginModal, children }) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto
       "animate-in opacity-100 fade-in-0 transition-opacity duration-150 ease-out "
         
      `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:flex sm:p-0 bg-borderColor bg-opacity-70">
        <div
          className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-out ${
            openLoginModal
              ? "animate-in opacity-100 fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]"
              : "animate-out opacity-0 fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]"
          }`}
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={` inline-block bg-white rounded-md overflow-hidden shadow-lg transform transition-all p-2  border border-shadeColor w-80 sm:w-96 ${
            openLoginModal
              ? "animate-in opacity-100 fade-in-0  zoom-in-50 transition-opacity duration-500 ease-out "
              : "animate-out opacity-0 fade-out-0 zoom-out-95 "
          }`}
        >
          <div
            className="flex justify-end w-full px-1 cursor-pointer hover:text-primary"
            onClick={() => setOpenLoginModal(false)}
          >
            x
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
