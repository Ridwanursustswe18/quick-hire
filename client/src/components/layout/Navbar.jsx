import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className="w-full bg-white border-b border-[#D6DDEB] px-8 lg:px-[124px] py-0 flex justify-between items-center h-[80px] sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4640DE] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-[20px] text-[#25324B] tracking-tight font-clash-display">
            QuickHire
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="font-epilogue font-medium text-[16px] text-[#515B6F] hover:text-[#4640DE] transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            to="/"
            className="font-epilogue font-medium text-[16px] text-[#515B6F] hover:text-[#4640DE] transition-colors"
          >
            Browse Companies
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isAdmin ? (
          <Link
            to="/"
            className="font-epilogue font-bold text-[16px] text-[#4640DE] hover:underline"
          >
            ← Back to Jobs
          </Link>
        ) : (
          <>
            <Link
              to="/admin"
              className="font-epilogue font-bold text-[16px] text-[#4640DE] px-4 py-3 hover:bg-[#4640DE10] rounded transition-colors"
            >
              Admin
            </Link>
            <button className="font-epilogue font-bold text-[16px] text-[#4640DE] px-4 py-3">
              Login
            </button>
            <button className="font-epilogue font-bold text-[16px] text-white bg-[#4640DE] px-6 py-3 hover:bg-[#3730c4] transition-colors">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;