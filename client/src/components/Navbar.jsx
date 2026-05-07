import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-5 w-[60%] py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 mx-auto mt-5">
      <h1 className="font-bold py-2 cursor-pointer tracking-wider">Photo2Print</h1>
      <h1 className=" py-2 cursor-pointer text-gray-500 font-semibold">How It Works</h1>
      <h1 className="font-bold cursor-pointer bg-black text-white px-5 py-2 rounded-full">Get Started</h1>
    </div>
  );
};

export default Navbar;