import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteOneProduct, removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";


const AddCart = () => {
  const cart = useSelector((store) => store.cart.products);
  const totalPrice = useSelector((store) => store.cart.total);
console.log("cart data--->",cart);

  // const totalPrice = cart.reduce((acc, item) => {
  //   const price = item.discount_price ? item.discount_price : item.price;
  //   return acc + price * item.quantity;
  // }, 0);

  const dispatch = useDispatch();

  const handleMinus = (product) => {
    dispatch(
      removeFromCart(
        product,
      )
    );
  };

  const handlePlus = (product) => {
    dispatch(
      addToCart(
        product,
      )
    );
  };

  const handleRemove = (product) => {
    dispatch(
      deleteOneProduct(
        product,
      )
    );
  };
  //  Empty Cart Check
  if (!cart || cart?.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/shop">
            <button className="bg-black text-white px-6 py-3 rounded-md cursor-pointer hover:bg-gray-800 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (

    <div className="mt-16">
      
      <h2 className="text-lg font-semibold pb-4">Product</h2>
      <div className="lg:grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <div className="">
            <div className="hidden md:block">
              <div className="grid grid-cols-12 gap-5 border-b py-4 font-semibold">
                <div className="col-span-9 px-4">
                  <h1>Product</h1>
                </div>
                <div className="col-span-2  text-center">
                  <h1 className="pl-2">Quantity</h1>
                </div>
                <div className="col-span-1 text-right pr-4">
                  <h1>Total</h1>
                </div>
              </div>
            </div>

            <div>
              {
                cart?.length < 1 &&
                <div className="text-center py-4">
                  <h2 className="text-lg font-semibold">Your cart is empty</h2>
                  <Link href="/shop">
                    <button className="bg-black text-white px-4 py-2 mt-4 cursor-pointer">
                      Go to Shop
                    </button>
                  </Link>
                </div>
              }
            </div>

            <div>
              {cart?.map((item) => (
                <div
                  key={item?._id}
                  className="md:flex justify-between items-center border-b py-4"
                >
                  <div className="md:flex items-center hidden">
                    <Image
                      src={item?.image_urls?.[0]}
                      width={80}
                      height={80}
                      className="rounded"
                      alt={item?.name}
                    />
                  </div>

                  <div className="flex-1 px-4 hidden md:block">
                    <p className="font-medium">{item?.name}</p>
                    <p className="text-gray-500">
                      {Number(item?.discount_price || item?.price).toLocaleString(
                        "en-US",
                        {
                          currency: "USD",
                          style: "currency",
                        }
                      )}
                    </p>
                  </div>

                  <div className="block md:hidden">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Image
                          src={item?.image_urls?.[0]}
                          width={80}
                          height={80}
                          className="rounded"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 px-4 md:hidden">
                        <p className="font-medium">{item?.name}</p>
                        <p className="text-gray-500">
                          {Number(
                            item?.discount_price || item?.price
                          ).toLocaleString("en-US", {
                            currency: "USD",
                            style: "currency",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-5 md:mt-0 justify-between md:justify-start">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleMinus(item)}
                        className="px-2 py-1 border cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handlePlus(item)}
                        className="px-2 py-1 border cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <p className="px-4 font-semibold">
                      {Number(
                        (item.discount_price || item.price) * item.quantity
                      ).toLocaleString("en-US", {
                        currency: "USD",
                        style: "currency",
                      })}
                    </p>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-red-500 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-l col-span-4 mt-9 md:mt-0">
          <div className=" p-4 rounded-md">
            <h2 className="text-lg font-semibold pb-4">Order Overview</h2>
            <p>Total Items: {cart?.length}</p>
            <p>
              Sub Total:{" "}
              {Number(totalPrice).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
              {/* ${totalPrice} */}
            </p>
            <Link href={"/checkOut"}>
              {" "}
              {
                cart?.length > 0 && <button className="w-full cursor-pointer bg-black text-white py-2 mt-4">
                  Check Out
                </button>
              }

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCart;
