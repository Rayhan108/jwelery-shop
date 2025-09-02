"use client";

import Image from "next/image";
import { Form, Input, } from "antd";
// import { FaRegCreditCard } from "react-icons/fa";
// import img1 from "../../../public/home/pop1.png";
// import img2 from "../../../public/home/pop2.png";
// import img3 from "../../../public/home/pop3.png";
// import Visa from "../../../public/ring/visa.png";
// import Master from "../../../public/ring/money.png";
// import Paypal from "../../../public/ring/paypal.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddOrderSubmitMutation } from "@/redux/Api/webmanageApi";
import { useRouter } from "next/navigation";

export const Check = () => {
  const router = useRouter()
  const [addOrder, { isLoading }] = useAddOrderSubmitMutation()
  const cart = useSelector((store) => store.cart.products);
  const totalPrice = useSelector((store) => store.cart.total);
  console.log(cart)
  const fee = 5.00
  // const totalPrice = cart.reduce((acc, item) => {
  //   const price = item.discount_price ? item.discount_price : item.price;
  //   return acc + price * item.quantity;
  // }, 0);



  const onFinish = async (values) => {
    const data = {
      shipping_address: values.shipping_address,
      zip: values.zip,
      city: values.city,
      state: values.state,
      products: cart.map(product => ({
        id: product._id,
        color: product.color,
        size: product.size,
        quantity: product.quantity,
      }))
    };
    try {
      const response = await addOrder(data).unwrap();
      toast.success(response.message);
      console.log(response?.stripe_url)
      window.open(response?.stripe_url, '_blank')

    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div>
      <div className=" mt-10 md:grid grid-cols-12 gap-6">
        {/* Order Details */}
        <div className="col-span-5  ">
          <h2 className="text-lg font-semibold pb-4">Order Details</h2>
          <div className=" pb-3">
            <div className="grid grid-cols-12 font-medium text-gray-600">
              <span className="col-span-8">Product</span>
              <span className="col-span-4 text-right">Price</span>
            </div>
          </div>

          <div className="border-b">
            {cart?.map((item) => (
              <div key={item.id} className="flex items-center  py-4">
                <Image
                  src={item.image_urls?.[0]}
                  width={80}
                  height={80}
                  alt={item.name}
                />
                <div className="flex-1 px-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className=""> {Number(
                  (item.discount_price || item.price) * item.quantity
                ).toLocaleString("en-US", {
                  currency: "USD",
                  style: "currency",
                })}</p>
              </div>
            ))}
          </div>

          <div className="py-4">
            <div className="flex justify-between  ">
              <p>Sub Total:</p>
              <p> {Number(totalPrice).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}</p>
            </div>
            <div className="flex justify-between border-b py-4">
              <p>Shipping Fee:</p>
              <p>{Number(fee).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}</p>
            </div>
            <div className="flex justify-between  text-lg">
              <p>Total:</p>
              <p>{Number(totalPrice + fee).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}</p>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="col-span-7  md:border-l md:pl-6 mt-9 md:mt-0">
          <h2 className="text-lg font-semibold pb-4">Shipping Address</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="shipping_address" label="Street Address">
              <Input
                style={{ padding: "9px", borderRadius: "0px" }}
                placeholder="Enter your street address"
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="city" label="City">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Enter city"
                />
              </Form.Item>
              <Form.Item name="state" label="State">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Enter state"
                />
              </Form.Item>
            </div>
            <Form.Item name="zip" label="Zip Code">
              <Input
                style={{ padding: "9px", borderRadius: "0px" }}
                placeholder="Enter zip code"
              />
            </Form.Item>

            {/* <h2 className="text-lg font-semibold pt-4 pb-2">Payment Options</h2>
            <Form.Item name="payment">
              <Radio.Group className="flex items-center gap-4">
                <Radio value="visa">
                  <Image
                    className="mt-[6px]"
                    src={Visa}
                    width={50}
                    height={30}
                    alt="Visa"
                  />
                </Radio>
                <Radio value="mastercard">
                  <Image
                    className="mt-[6px]"
                    src={Master}
                    width={50}
                    height={30}
                    alt="MasterCard"
                  />
                </Radio>
                <Radio value="paypal">
                  <Image
                    className="mt-[6px]"
                    src={Paypal}
                    width={50}
                    height={30}
                    alt="PayPal"
                  />
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="cardNumber" label="Cardholder Number">
              <Input
                style={{ padding: "9px", borderRadius: "0px" }}
                prefix={<FaRegCreditCard />}
                placeholder="Enter card number"
              />
            </Form.Item>
            <Form.Item name="cardName" label="Cardholder's Name">
              <Input
                style={{ padding: "9px", borderRadius: "0px" }}
                placeholder="Enter name"
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="expiry" label="Expiry Date">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="mm/yy"
                />
              </Form.Item>
              <Form.Item name="cvc" label="CVC">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Input here"
                />
              </Form.Item>
            </div> */}

            <button disabled={isLoading} type="submit" className="w-full bg-black text-white py-2 cursor-pointer">
              {isLoading ? "Loading..." : "Pay Now"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
