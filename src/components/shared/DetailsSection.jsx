"use client";

import { FaRegHeart } from "react-icons/fa";
import { MdStar, MdStarOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartForNagivate,
  updateColor,
  updateSize,
} from "../../redux/slices/cartSlice";
import { useAddFavoriteMutation } from "@/redux/Api/webmanageApi";
import { toast } from "react-toastify";
import Link from "next/link";

const DetailsSection = ({ product }) => {
  const products = useSelector((store) => store.cart.products);
  console.log(products);
  // console.log('product from shop', product);
  const [ addFavorite ] = useAddFavoriteMutation();
  const savings =
    ((product?.price - product?.discount_price) / product?.price) * 100;

  const availability = {
    in_stock: "In Stock",
    stock_out: "Stock Out",
    upcoming: "Upcoming",
  };

  const averageRating =
    product.ratings.length > 0
      ? product.ratings.reduce((sum, rating) => sum + rating, 0) /
      product.ratings.length
      : 0;

  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.products).find(
    (item) => item._id === product._id
  );

  const handleFavorite = async (record) => {
    console.log(record);
    const data = {
      product_id: record,
      type: "add",
    };
    try {
      const response = await addFavorite(data).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  // useEffect(() => {
  //   if (cart) {
  //     setSelectedColor(cart.color);
  //     setSelectedSize(cart.size);
  //   } else {
  //     setSelectedColor(product.colors?.[0] || "");
  //     setSelectedSize(product.sizes?.[0] || "");
  //   }
  // }, [cart, product]);

  // useEffect(() => {
  //   if (!cart) {
  //     dispatch(updateColor({ ...product, color: selectedColor }));
  //     dispatch(updateSize({ ...product, size: selectedSize }));
  //   }
  // }, [dispatch, product, selectedColor, selectedSize, cart]);

  const handleColor = (color) => {
    dispatch(updateColor({ ...product, color }));
  };

  const handleSize = (size) => {
    // setSelectedSize(size);
    console.log(size);
    dispatch(updateSize({ ...product, size }));
  };

  // const quantity = cart?.quantity || 0;

  // const handleAddToCart = () => {
  //   if (cart && quantity) {
  //     dispatch(removeFromCart(product));
  //   } else {
  //     dispatch(
  //       addToCart({ ...product, color: selectedColor, size: selectedSize })
  //     );
  //   }
  // };

  const increaseQuantity = () => {
    dispatch(
      addToCartForNagivate(
        product,
      )
    );
  };

  // if(!cart.size){
  //   return message.success('Please select a size');
  // }
  // const decreaseQuantity = () =>
  //   dispatch(
  //     removeFromCart(
  //       product,
  //     )
  //   );
  return (
    <div>
      <div>
        {product?.discount_price && (
          <button className="px-4 py-1 mt-9 lg:mt-0 border border-black rounded-full">
            Save {savings.toFixed(2)}%
          </button>
        )}
        <h1>Working</h1>
        <h1 className="text-2xl font-semibold py-5">{product?.name}</h1>
        <div className="flex items-center gap-5 ">
          <div>
            <button className="rounded px-4  py-1 bg-gray-200">
              {availability?.[product?.availability]}
            </button>
          </div>
          <div>
            <div className="flex gap-1 justify-center items-center ">
              {[...Array(5)].map((_, index) =>
                index < averageRating ? (
                  <MdStar key={index} />
                ) : (
                  <MdStarOutline key={index} />
                )
              )}
              <span className="text-neutral-800 ">
                ({product?.ratings?.length} Review)
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center py-5">
          <h1 className="text-xl">
            {Number(product?.discount_price || product?.price).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </h1>
          {product?.discount_price && (
            <del className="text-gray-600 text-sm">
              {Number(product?.discount_price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </del>
          )}
        </div>
        <p className="text-gray-600">{product?.details}</p>
        <div>
          <div className=" flex items-center space-x-4 mb-4">
            <div>
              <p className="font-semibold">Color</p>
              <div className="flex space-x-2">
                {product?.colors?.map((color) => (
                  <button
                    onClick={() => handleColor(color)}
                    key={color}
                    className={`cursor-pointer md:px-4 px-2 md:py-2 py-1 border text-sm hover:bg-gray-200 ${cart?.color === color && "bg-gray-200"
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Size Selector */}
          <div className=" flex items-center space-x-4">
            <div>
              <p className="font-semibold">Size</p>
              <div className="flex space-x-2">
                {product?.sizes?.map((size) => (
                  <button
                    onClick={() => handleSize(size)}
                    key={size}
                    className={`cursor-pointer md:px-4 px-2 md:py-2 py-1 border text-sm hover:bg-gray-200 ${cart?.size === size && "bg-gray-200"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex md:gap-4 gap-2 my-5">
            {/* <div className=" flex items-center space-x-4">
              <div className="flex items-center space-x-4 border py-1 md:py-2">
                <button
                  className="md:w-11 w-8 border-r  text-lg cursor-pointer"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <p className="md:px-4 px-2 ">{quantity}</p>
                <button
                  className="md:w-11 w-8 border-l text-lg cursor-pointer"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div> */}

            {/* Add to Cart Button */}
            <div className=" w-full">
              <Link href={`/myCart`}>
                <button
                  onClick={increaseQuantity}
                  className={`w-full md:py-[11px] py-[7px] bg-black text-white font-semibold cursor-pointer`}
                >
                  {"Add To Cart"}
                </button>
              </Link>
            </div>
            <button onClick={() => handleFavorite(product?._id)} className="border px-4 text-2xl cursor-pointer">
              <FaRegHeart />
            </button>
          </div>

          {/* Estimated Delivery Time */}
          <div className="mt-4 text-sm text-gray-500 flex items-center space-x-1">
            <p>Estimated delivery time: 5-6 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
