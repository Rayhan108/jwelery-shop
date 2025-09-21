"use client"
import { useState } from 'react'
import { Checkbox, Form, Input } from "antd"
import Link from "next/link"
import { useLoginUserMutation } from '@/redux/Api/userAPi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

const SignInSection = () => {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      const response = await loginUser(data).unwrap();
      toast.success(response.message);

      localStorage.setItem("accessToken", response.accessToken);
      Cookies.set('jewellery-web-token', response.accessToken)
      setLoading(false)
      const url = "/"
      router.push(url)

      // **Force a full page reload to re-run middleware**
      setTimeout(() => {
        window.location.href = url; // Hard reload to trigger middleware
      }, 500);
    } catch (error) {
      toast.error(error.data.message);
      setLoading(false)
      console.log(error);
    }
  }
  return (
    <div>
      <div className="w-full max-w-[1500px] m-auto">
        <div className="gap-5">
          <div className="lg:flex lg:justify-center">
            <div className="bg-white lg:w-[500px] md:px-16 px-5 py-16 border">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Welcome back!
              </h2>
              <p className="pb-7">Please log in to continue access</p>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    style={{ padding: '9px', borderRadius: '0px' }}
                    placeholder="Enter your Email"
                    className="w-full px-4  border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item

                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    style={{ padding: '9px', borderRadius: '0px' }}
                    placeholder="Enter your password"
                    className="w-full px-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-700">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    href={"/auth/signIn/forgetPassword"}

                  >
                    <span className="text-sm  text-black">Forget password?</span>
                  </Link>
                </div>

                <Form.Item>
                  <button
                    type="primary"
                    htmltype="submit"
                    loading={loading}

                    className="w-full py-2 bg-black text-white cursor-pointer"
                  >
                    {loading ? "Loading..." : "Sign In"}
                  </button>
                </Form.Item>
              </Form>
              <span className="flex justify-center gap-1">
                already have an don't account?{" "}
                <Link href={"/auth/signUp"}>
                  <span className="font-semibold"> Sign Up</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInSection