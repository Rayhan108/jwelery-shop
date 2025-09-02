"use client";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useResentOtpMutation, useVerifyOtpMutation } from "../../redux/Api/userAPi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const VeryfyRegister = () => {
  //   const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyOtp] = useVerifyOtpMutation();
  const [resentOtp, { isLoading }] = useResentOtpMutation();
  const handleVerify = async () => {
    const data = {
      otp: otp,
      email: localStorage.getItem("email"),
    };

    setLoading(true);
    try {
      const response = await verifyOtp(data).unwrap();
      toast.success(response.message);
      router.push("/auth/signIn");

      setLoading(false);
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
      setLoading(false);
    }
  }
  const handleResend = () => {
    const data = {
      email: localStorage.getItem("email"),
      type: "signup"
    };
    resentOtp(data).unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
        console.log(error);
      })
  }

  return (
    <div className="items-center justify-center px-4 flex min-h-screen bg-white">
      <div className="flex justify-center">
        <div className="bg-white lg:w-[500px] md:px-16 px-5 py-16 border">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Check your email
          </h2>
          <h3 className="text-[#333333] text-center mb-5">
            We sent a reset link to {"your email"}. Enter the 5-digit
            code mentioned in the email.
          </h3>
          <div className="flex justify-center mb-5">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-1"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-16 h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ width: "40px", height: "50px" }}
                />
              )}
            />
          </div>

          {/* Verify OTP Button */}
          <button
            type="primary"
            block
            size="large"
            className="w-full py-2 bg-black text-white cursor-pointer"
            loading={loading} // Show loading spinner when verifying
            onClick={handleVerify}
          >
            {loading ? "Loading..." : "Verify Otp"}
          </button>

          <span className="flex justify-center gap-1 mt-4">
            You have not received the email?{" "}
            <button
              type="link"
              className="font-semibold cursor-pointer"
              onClick={handleResend}
            >
              {isLoading ? "Loading..." : "Resend"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VeryfyRegister;
