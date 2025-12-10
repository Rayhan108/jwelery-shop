"use client";
import Image from "next/image";
import hero from "../../../public/shared/sss.jpg";

import Link from "next/link";
import { useAddFavoriteMutation, useGetFavoritesQuery } from "@/redux/Api/webmanageApi";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import ProductSkeleton from "../../components/Skeleton/ProductSkeleton";


const page = () => {
  const { data: favorite, isLoading } = useGetFavoritesQuery();
  console.log(favorite?.products)
  const [addFavorite] = useAddFavoriteMutation();
  const handleFavorite = async (record) => {
    console.log(record);
    const data = {
      product_id: record,
      type: "remove",
    };
    try {
      const response = await addFavorite(data).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };


  return (
    <div className="container m-auto mt-9 px-4 lg:px-0">
      <div>
        <h1 className="pb-4">Home/Favorite</h1>
        <div
          className="relative bg-cover bg-center md:h-[55vh] h-[200px] -mt-[1px]"
          style={{
            width: "100%",
          }}
        >
          <Image
            src={hero}
            className="rounded-2xl"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute px-4 lg:px-0 inset-0 flex justify-center items-center ">
            <div className="">
              <div className="">
                <div className="text-3xl font-semibold md:text-5xl ">
                  <h1 className="">Favorite</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className=" pt-16">Showing {favorite?.products?.length} result</h1>
      {
        isLoading ?
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 container m-auto mt-6 ">
            <ProductSkeleton></ProductSkeleton>
            <ProductSkeleton></ProductSkeleton>
            <ProductSkeleton></ProductSkeleton>
            <ProductSkeleton></ProductSkeleton>
            <ProductSkeleton></ProductSkeleton>

          </div>
          :
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 container m-auto mt-4 ">
            {favorite?.products?.map((item, index) => (
              <div key={index}>

                <div>
                  <div className="relative">
                    <Link href={`/productDetails/${item._id}`}>
                      <Image
                        width={900}
                        height={400}
                        className=" md:h-[360px] object-cover"
                        src={item?.image_urls[0]}
                        alt=""
                      />
                    </Link>
                    <div
                      onClick={() => handleFavorite(item._id)}
                      className="absolute cursor-pointer top-0 right-0  flexitems-center p-1 mr-1 mt-1 rounded-full bg-white text-red-600 text-xl"
                    >
                      <FaHeart />
                    </div>
                  </div>
                  <h1 className=" pt-2">{item?.name}</h1>
                  <p className="text-sm">
                    {Number(item?.discount_price || item?.price).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

      }
    </div>
  );
};

export default page;
