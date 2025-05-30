
import React from 'react';
import { Link } from 'react-router-dom';

const SignupLinks: React.FC = () => {
  return (
    <>
      <div className="mt-4 text-center text-sm">
        Already have a rider account?{" "}
        <Link to="/rider-login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
      
      <div className="mt-2 text-center text-sm">
        <Link to="/driver-signup" className="text-gray-600 hover:underline">
          Sign up as Driver instead
        </Link>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-xs text-green-700">
          Create your rider account with valid credentials. You'll need to verify your email before you can log in.
        </p>
      </div>
    </>
  );
};

export default SignupLinks;
