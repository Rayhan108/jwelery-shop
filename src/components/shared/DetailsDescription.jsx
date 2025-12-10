"use client";
import React, { useRef, useState } from "react";
;
import ReviewTab from "./ReviewTab";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CardShop from "./CardShop";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetReviewTotalQuery } from "@/redux/Api/webmanageApi";

const DetailsDescription = ({ product, id, similarProducts }) => {
  console.log('similar product', similarProducts);
  const { data: reviewData,refetch:reviewRefetch } = useGetReviewTotalQuery(id);
  const [activeTab, setActiveTab] = useState("description");

  const splideRef = useRef(null);

  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };
  return (
    <div className=" md:mt-20 mt-11">
      {/* Tab Navigation */}
      <div className="flex border-b justify-center mb-8">
        <button
          className={`px-4 py-2  text-gray-700 ${activeTab === "description" ? "border-b-2 border-black " : ""
            }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`px-4 py-2 text-gray-700 ${activeTab === "reviews" ? "border-b-2 border-black" : ""
            }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews {reviewData?.pagination?.totalReviews || 0}
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === "description" && (
          <div>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="mt-11">
              <div className="">
                <div className="flex justify-between mb-6">
                  {/* <Title head={"category"} title={"Browse By Category"}></Title> */}
                  <h1 className="text-2xl font-semibold">Related Product</h1>
                  <div className="flex gap-2  ">
                    <div onClick={handlePrevClick}>
                      <div className=" rounded-full text-2xl p-2 text-black cursor-pointer">
                        <IoIosArrowBack />
                      </div>
                    </div>
                    <div onClick={handleNextClick}>
                      <div className="   rounded-full text-2xl p-2 text-black cursor-pointer">
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>

              <div>
                <Splide
                  ref={splideRef}
                  options={{
                    type: "slide" ,
                    perPage: 5,
                    gap: "1rem",
                    arrows: false,
                    pagination: false,
                    breakpoints: {
                      1024: { perPage: Math.min(similarProducts?.length || 1, 3) },
                      768: { perPage: Math.min(similarProducts?.length || 1, 2) },
                      640: { perPage: 1 },
                    },
                  }}
                  aria-label="Category Slide"
                >
                  {similarProducts?.map((item, index) => (
                    <SplideSlide key={index}>
                      <CardShop item={item} />
                    </SplideSlide>
                  ))}
                </Splide>

              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <ReviewTab id={id} product={product} reviewRefetch={reviewRefetch}></ReviewTab>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsDescription;
