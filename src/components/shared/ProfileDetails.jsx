"use client";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/Api/userAPi";

const ProfileDetails = () => {
  const { data: profile } = useGetProfileQuery();
  console.log(profile);
  return (
    <div className=" mt-10 md:grid grid-cols-12 gap-6">
      {/* Left Section */}
      <div className="col-span-6">
        <h2 className="text-2xl font-semibold">Welcome to your account!</h2>
        <p className="text-gray-600 mt-2">
          Update your details, manage addresses, store payment methods, and keep
          your account secure.
        </p>

        <p className="text-gray-600 mt-4">
          If you need any help{" "}
          <Link
            href="/contactUs"
            className="text-blue-600 underline font-medium"
          >
            contact us
          </Link>
          :
        </p>

        {
          profile?.shipping_address ?
            <div className="mt-5">
              <p className="flex items-center mb-2">
                <span className="mr-2">
                  <FaPhoneAlt />
                </span>{" "}
                {profile?.phone}
              </p>
              <p className="flex items-center mb-2">
                <span className="mr-2">
                  <IoMail />
                </span>{" "}
                {profile?.email}
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  <FaLocationDot />
                </span>
                {profile?.shipping_address?.street_address}
              </p>
            </div>
            :
            <div>
              <Link href={'/changeAddress'}><button className=" cursor-pointer border px-7 py-2 border-gray-400 mt-5">
                Update Address
              </button></Link>
            </div>
        }

      </div>

      {/* Right Section */}
      <div className="col-span-6">
        <h2 className="text-xl font-semibold md:pb-6 pt-9 md:pt-0">Account Details</h2>

        {/* Login Details */}

        <div className="md:flex justify-between">
          <p className="font-medium ">Login Details:</p>
          <div className="mt-1 space-y-4">
            <p>
              <span className="">Full Name:</span>{" "}
              <h1 className="font-semibold">{profile?.name}</h1>
            </p>
            <p>
              <span className="">Email:</span>{" "}
              <h1 className="font-semibold">{profile?.email}</h1>
            </p>
            <p>
              <span className="">Phone Number:</span>{" "}
              <h1 className="font-semibold">{profile?.phone}</h1>
            </p>
          </div>

          <div>
            <Link href={'/editProfile'}><button className="mt-4 cursor-pointer border px-7 py-2 border-gray-400">
              Edit Account
            </button></Link>
          </div>
        </div>

        {/* Password Section */}
        <div className="mt-6 md:flex justify-between">
          <p className="font-medium ">Password:</p>
          <p className="">
            Current Password: <h1>●●●●●●●●</h1>
          </p>
          <div>
            <Link href={'/changPass'}><button className="mt-2 border cursor-pointer px-7 py-2 border-gray-400">
              Change Password
            </button></Link>
          </div>
        </div>

        {/* Address Book */}
        <div className="mt-6 md:flex justify-between">
          <p className="font-medium text-gray-700">Address Book:</p>
          <p className="">
            <span className="font-medium">Shipping Address:</span>
            <br />
            {profile?.shipping_address?.street_address}, {profile?.shipping_address?.city}, {profile?.shipping_address?.state}, {profile?.shipping_address?.zip_code}
          </p>
          <div>
            <Link href={'/changeAddress'}><button className="mt-2 cursor-pointer border px-12 py-2 border-gray-400">
              Change Address
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
