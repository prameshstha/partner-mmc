const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-bold">
          Partner Dashboard
        </a>
        <div className="hidden md:flex space-x-4">
          <a href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </a>
          <a href="/customer-check" className="text-gray-300 hover:text-white">
            Customer Check
          </a>
          <a href="/portfolio" className="text-gray-300 hover:text-white">
            Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
