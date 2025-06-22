import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Register from "./Register";
import { Button } from "@heroui/react";

const SocialLogin: React.FC = () => {
  
  return (
    <div className="flex flex-col space-y-2 w-1/2 px-6 mt-2">
      <p className="text-xs mb-4 text-content5">By continuing you indicate that you agree to Quora’s <span className="text-blue-500">Terms of Service</span> and <span className="text-blue-500">Privacy Policy</span>.</p>
      <div className="w-full flex flex-col gap-y-3">
        <Button className="bg-content1 w-full" variant="bordered" radius="none">
          <FaGoogle className="w-5 h-5" />
          <span className="ml-3 text-sm">Sign in with Google</span>
        </Button>
        <Button className="bg-content1 w-full" variant="bordered" radius="none">
          <FaFacebook className="w-5 h-5" />
          <span className="ml-3 text-sm">Sign in with Google</span>
        </Button>
      </div>

      <Register />
    </div>
  );
};

export default SocialLogin;
