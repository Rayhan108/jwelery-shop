"use client";

import { useAddFavoriteMutation } from "@/redux/Api/webmanageApi";
// import { addToCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import missingImage from "../../../public/missing-img.avif";
import { Spin, ConfigProvider } from "antd";  // Ensure Spin is properly imported

const CardShop = ({ item }) => {
  const [addFavorite, { isLoading }] = useAddFavoriteMutation();
  // const dispatch = useDispatch();
  console.log(item);

  // const increaseQuantity = () => {
  //   dispatch(
  //     addToCart(
  //       item
  //     )
  //   );
  // };

  const handleFavorite = async (id) => {
    console.log('clicked favorite', id);
    // if (!item?._id) {
    //   toast.error("Invalid product data");
    //   return;
    // }
    const data = {
      product_id: id,  // Use item._id directly, not record
      type: "add",
    };

    try {
      const res = await addFavorite(data).unwrap();
      toast.success(res.message);  // Show success message from response
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding to favorites");
    }
  };

  return (
    <div>
      <div className="relative">
        <Link href={`/productDetails/${item?._id}`}>
          <Image
            // onClick={increaseQuantity}
            width={900}
            height={400}
            className="md:h-[360px] object-cover"
            src={item?.image_urls[0] || missingImage} // Fallback to missing image
            alt={item?.name || "Product Image"}
          />
        </Link>
        <div
          onClick={() => handleFavorite(item?._id)} // Calling handleFavorite when clicked
          className="absolute cursor-pointer top-0 right-0 flex items-center p-2 mr-1 mt-1 rounded-full bg-white text-xl z-10 pointer-events-auto"
        >
          {isLoading ? (
            <ConfigProvider
              theme={{
                components: {
                  Spin: {
                    colorPrimary: "rgb(51,51,51)",
                  },
                },
              }}
            >
              <Spin />
            </ConfigProvider>
          ) : (
            <FiHeart size={26} />
          )}
        </div>
      </div>
      <h1 className="pt-2">{item?.name}</h1>
      <p className="text-sm">
        {item?.discount_price ? (
          <>
            <span className="text-gray-400 line-through mr-2">
              {Number(item.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <span className="">
              {Number(item.discount_price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </>
        ) : (
          <span className="">
            {Number(item?.price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        )}
      </p>

    </div>
  );
};

export default CardShop;
