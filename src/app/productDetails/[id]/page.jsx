"use client";
import Image from "next/image";
import DetailsSection from "../../../components/shared/DetailsSection";
import DetailsDescription from "../../../components/shared/DetailsDescription";
import mainUrl from "../../../components/shared/mainUrl";
import React, { useState, useEffect } from "react";

const Page = ({ params }) => {
  const { id } = React.use(params);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await mainUrl(`/products/${id}`);

        if (data?.product) {
          setProduct(data.product);
          setSimilarProducts(data.similarProducts);
          setSelectedImage(data.product?.image_urls?.[0] || "");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        // You can set a fallback state or error state here if needed
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) {
    return <div className=" text-center py-32">Loading...</div>; // Loading state
  }

  return (
    <div className="container mx-auto mt-6 px-4 ">
      <h1 className="pb-4 text-gray-600">Home / Rings / Willow Diamond Engagement Ring</h1>

      <div className="lg:grid lg:grid-cols-2 gap-8">
        <div className="lg:flex gap-2">
          <div className="flex lg:flex-col flex-row gap-2 md:gap-2 lg:gap-2 xl:gap-2">
            {product?.image_urls?.length > 0 &&
              product.image_urls.map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:border hover:border-gray-400"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    className="object-cover w-20 h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-30 2xl:h-30"
                    width={100}
                    height={100}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
          </div>

          {/* Main Large Image */}
          <div className="lg:flex-1 mt-2 lg:mt-0">
            <Image
              className="object-cover w-full lg:h-[430px] xl:h-[430px] 2xl:h-[630px]"
              width={500}
              height={500}
              src={selectedImage}
              alt="Main image"
            />
          </div>
        </div>

        {/* Details Section */}
        <DetailsSection product={product} />
      </div>

      {/* Description Section */}
      <DetailsDescription
        product={product}
        id={id}
        similarProducts={similarProducts}
      />
    </div>
  );
};

export default Page;
