"use client";

import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdStar, MdStarOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCartForNavigate } from "../../redux/slices/cartSlice";
import { useAddFavoriteMutation } from "@/redux/Api/webmanageApi";
import { toast } from "react-toastify";
import Link from "next/link";

const DetailsSection = ({ product }) => {
  // Local state for selected color and size
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const products = useSelector((store) => store.cart.products);
  console.log("prod ", product);

  const [addFavorite] = useAddFavoriteMutation();
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

  // Check if product has colors and sizes
  const hasColors = product?.colors?.length > 0;
  const hasSizes = product?.sizes?.length > 0;

  // Determine if button should be disabled
  const isColorSelected = !hasColors || selectedColor !== "";
  const isSizeSelected = !hasSizes || selectedSize !== "";
  const isButtonDisabled = !isColorSelected || !isSizeSelected;

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

  // ✅ FIXED: Only update local state, don't dispatch to Redux
  const handleColor = (color) => {
    setSelectedColor(color);
    // ❌ REMOVED: dispatch(updateColor({ ...product, color }));
  };

  // ✅ FIXED: Only update local state, don't dispatch to Redux
  const handleSize = (size) => {
    setSelectedSize(size);
    // ❌ REMOVED: dispatch(updateSize({ ...product, size }));
  };

  // ✅ Only add to cart when user clicks the button
  const handleAddToCart = () => {
    if (isButtonDisabled) {
      if (!isColorSelected) {
        toast.warning("Please select a color");
      }
      if (!isSizeSelected) {
        toast.warning("Please select a size");
      }
      return;
    }
    
    dispatch(
      addToCartForNavigate({
        ...product,
        color: selectedColor || null,
        size: selectedSize || null,
      })
    );
  };

  return (
    <div className=" w-[300px]">
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
          {/* Color Selector */}
          {hasColors && (
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <p className="font-semibold">
                  Color{" "}
                  {!selectedColor && (
                    <span className="text-red-500 text-sm">*</span>
                  )}
                </p>
                <div className="flex space-x-2">
                  {product?.colors?.map((color) => (
                    <button
                      onClick={() => handleColor(color)}
                      key={color}
                      className={`cursor-pointer md:px-4 px-2 md:py-2 py-1 border text-sm hover:bg-gray-200 transition-all ${
                        selectedColor === color
                          ? "bg-black text-white border-black"
                          : "bg-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Size Selector */}
          {hasSizes && (
            <div className="flex items-center space-x-4">
              <div>
                <p className="font-semibold">
                  Size{" "}
                  {!selectedSize && (
                    <span className="text-red-500 text-sm">*</span>
                  )}
                </p>
                <div className="flex space-x-2">
                  {product?.sizes?.map((size) => (
                    <button
                      onClick={() => handleSize(size)}
                      key={size}
                      className={`cursor-pointer md:px-4 px-2 md:py-2 py-1 border text-sm hover:bg-gray-200 transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Validation Message */}
          {isButtonDisabled && (hasColors || hasSizes) && (
            <p className="text-red-500 text-sm mt-3">
              * Please select {!isColorSelected && "color"}
              {!isColorSelected && !isSizeSelected && " and "}
              {!isSizeSelected && "size"} to continue
            </p>
          )}

          <div className="flex md:gap-4 gap-2 my-5">
            {/* Add to Cart Button */}
            <div className="w-full">
              {isButtonDisabled ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled}
                  className="w-full md:py-[11px] py-[7px] font-semibold transition-all bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  Add To Cart
                </button>
              ) : (
                <Link href={`/myCart`}>
                  <button
                    onClick={handleAddToCart}
                    className="w-full md:py-[11px] py-[7px] bg-black text-white font-semibold cursor-pointer hover:bg-gray-800 transition-all"
                  >
                    Add To Cart
                  </button>
                </Link>
              )}
            </div>
            <button
              onClick={() => handleFavorite(product?._id)}
              className="border px-4 text-2xl cursor-pointer hover:bg-gray-100 transition-all"
            >
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