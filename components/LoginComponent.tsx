import React from "react";
import LoginButton from "./LoginButton";

function LoginComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-50 px-40 mx-auto ">
      <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
      <p className="font-xs italic">
        This is is for test purposes only. Please
      </p>

      <div className="mt-5">
        <LoginButton />
      </div>
    </div>
  );
}

export default LoginComponent;
