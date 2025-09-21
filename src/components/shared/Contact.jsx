"use client";
import { Form, Input } from "antd";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useAddContactMutation } from "@/redux/Api/webmanageApi";
import { toast } from "react-toastify";
import { useGetProfileQuery } from "@/redux/Api/userAPi";
import { useGetContactUsInfoQuery } from "@/redux/Api/newApi";

const Contact = () => {
  const [addContact, { isLoading }] = useAddContactMutation();
  const { data: profile } = useGetProfileQuery();
  const { data: contactInfo } = useGetContactUsInfoQuery();

  // Create a form reference
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: values.message,
    };
    try {
      const response = await addContact(data).unwrap();
      toast.success(response.message);
      form.resetFields(); // Clear the form fields after successful submission
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <div>
        <div className=" mt-10 md:grid grid-cols-12 gap-6">
          {/* Order Detail */}
          <div className="col-span-5  ">
            <h2 className="text-lg font-semibold pb-4">Contact Details</h2>
            <p className="pb-5">
              We’re here to help! If you have any questions, concerns, or
              feedback, feel free to reach out to us.
            </p>

            <div>
              <p className="flex items-center mb-2">
                <span className="mr-2">
                  <FaPhoneAlt />
                </span>{" "}
                {contactInfo?.contactNumber}
              </p>
              <p className="flex items-center mb-2">
                <span className="mr-2">
                  <IoMail />
                </span>{" "}
                {contactInfo?.email}
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  <FaLocationDot />
                </span>
                {contactInfo?.address}
              </p>
            </div>
          </div>

          <div className="col-span-7   md:pl-6 mt-9 md:mt-0">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="name"
                label="Full Name"
              >
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder={profile?.name || "Enter Name"}
                  rules={[{ required: true, message: "Please write a Name" }]}
                />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input
                  initialValue={profile?.email}
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder={profile?.email || "Enter Email"}
                  rules={[{ required: true, message: "Please write a Email" }]}
                />
              </Form.Item>

              <Form.Item name="phone" label="Phone Number">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Enter Phone Number"
                  type="Number"
                  rules={[{ required: true, message: "Please write a Number" }]}
                />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please write a Message" }]}
              >
                <Input.TextArea
                  style={{ borderRadius: "0px" }}
                  rows={4}
                  placeholder="Write your review here..."
                />
              </Form.Item>

              <button
                type="primary"
                disabled={isLoading}
                className="w-full bg-black text-white py-2  cursor-pointer"
              >
                {isLoading ? "Loading..." : "Message Sent"}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
