import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex-col">
      <div className="w-full flex items-center justify-between px-10 font-medium">
        <div className="logoLinks flex items-center gap-4 lg:gap-[15vw] h-[60px]">
          <img
            src="https://freepngtransparent.com/wp-content/uploads/2023/03/nike-logo-png-174.png"
            alt="logo"
            width={200}
            className="cursor-pointer w-[180px] lg:w-[150px] object-cover"
          />
          <div className="w-full hidden md:flex gap-5 text lg:text-lg">
            <div className="cursor-pointer hover:text-purple-700 ease-in duration-300 delay-50">
              Explore
            </div>
            <div className="cursor-pointer hover:text-purple-700 ease-in duration-300 delay-50">
              About Us
            </div>
            <div className="cursor-pointer hover:text-purple-700 ease-in duration-300 delay-50">
              Service
            </div>
            <div className="cursor-pointer hover:text-purple-700 ease-in duration-300 delay-50">
              Contact
            </div>
          </div>
        </div>
        <div className="login hidden md:flex gap-4">
          <button className="font-[500] hover:text-purple-700 ease-in duration-300 delay-50">
            Sign Up
          </button>
          <button className="font-[500] border border-black hover:text-purple-700 hover:border-purple-500 ease-in duration-300 delay-100 px-3 py-2 mr-10">
            Login
          </button>
        </div>
        <div
          className="hamberger block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
              width={30}
              className="cursor-pointer"
              alt="hamburger"
            />
          ) : (
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png"
              width={20}
              alt="cross"
              className="cursor-pointer darkimage"
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="sider w-full h-screen flex flex-col items-center justify-start mt-10 text-lg gap-5 z-10 font-medium">
          <div className="">Explore</div>
          <div className="">About Us</div>
          <div className="">Service</div>
          <div className="">Contact</div>
          <div className="flex mt-10 gap-5 justify-center items-center">
            <div className="">Login</div>
            <div className="font-[500] border border-purple-500 text-purple-500 px-3 py-2">
              Sign In
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
