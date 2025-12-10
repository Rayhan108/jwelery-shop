"use client";

import React, { useState } from "react";
import { MdStar, MdStarOutline } from "react-icons/md";
import { Form, Input, Button, Rate, Select, Pagination } from "antd";
import {
  useAddReviewMutation,
  useGetReviewQuery,
} from "../../redux/Api/webmanageApi";
import { toast } from "react-toastify";
const ReviewTab = ({ id , product,reviewRefetch}) => {
  console.log(id);
  const [sortOrder, setSortOrder] = useState("");
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const { data: reviewData,refetch } = useGetReviewQuery({id,  page: currentPage,
    limit: pageSize, sort: sortOrder, rating:filterType,});
  console.log(reviewData);
  const [addReview] = useAddReviewMutation();

  const handleRatingChange = (value) => {
    setFilterType(value);
  };

  const handleShortChange = (value) => {
    setSortOrder(value);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const onFinish = async (values) => {
    const data = {
      review: values.review,
      email: values.email,
      name: values.name,
      rating: values.rating,
      product_id: id,
    };
    console.log("Received values:", values);
    try {
      const response = await addReview(data).unwrap();
      toast.success(response.message);
      refetch()
      reviewRefetch()
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const averageRating =
    product.ratings.length > 0
      ? product.ratings.reduce((sum, rating) => sum + rating, 0) /
        product.ratings.length
      : 0;
  return (
    <div>
      <div className="w-full md:p-4 p-2 bg-[#F5F5F5] ">
        {/* Overall Rating */}
        <div className="bg-white p-6 text-center">
          <h2 className=" font-bold">
            <div className="flex gap-1 justify-center items-center pt-5">
              <span className="text-3xl">{averageRating?.toFixed(1)}</span>
              {[...Array(5)].map((_, index) =>
                              index < averageRating ? (
                                <MdStar key={index} />
                              ) : (
                                <MdStarOutline key={index} />
                              )
                            )}
            </div>
          </h2>
          <p className="text-gray-600">Overall Rating</p>
        </div>

        {/* Filter Options */}
        <div className="md:flex gap-4 items-center mt-6">
          <div>
            <h1 className="pb-2">Rating</h1>
            <Select
              onChange={handleRatingChange}
              placeholder="Select Rating"
              style={{
                width: 220,
              }}
              
              options={[
                {
                  value: "1",
                  label: "Rating 1",
                },
                {
                  value: "1.5",
                  label: "Rating 1.5",
                },
                {
                  value: "2",
                  label: "Rating 2",
                },
                {
                  value: "2.5",
                  label: "Rating 2.5",
                },
                {
                  value: "3",
                  label: "Rating 3",
                },
                {
                  value: "3.5",
                  label: "Rating 3.5",
                },
                {
                  value: "4",
                  label: "Rating 4",
                },
                {
                  value: "4.5",
                  label: "Rating 4.5",
                },
                {
                  value: "5",
                  label: "Rating 5",
                },
              ]}
            />
          </div>
          <div>
            <h1 className="pb-2">Sort By</h1>
            <Select
            placeholder='Sort By'
              onChange={handleShortChange}
              style={{
                width: 220,
              }}
             
              options={[
                { value: "asc", label: "Most Recent" },
                { value: "desc", label: "Oldest" },
              ]}
            />
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-6 space-y-4">
          {reviewData?.reviews?.map((review, index) => {
            const formattedDate = new Date(
              review?.createdAt
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={index}
                className="bg-white p-4 shadow flex items-center gap-4"
              >
                <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${review?.name}`} alt="" />
                <div>
                  <h3 className="font-semibold">{review?.name}</h3>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                  <div>
                    <Rate disabled allowHalf defaultValue={review?.rating} />
                    <p className="text-gray-600 mt-2">{review?.review}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={reviewData?.pagination?.totalReviews || 0} // Updated to use meta.totalCount
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
      </div>

      <div className="mt-11">
        <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>

        <Form layout="vertical" onFinish={onFinish}>
          {/* Rating */}
          <Form.Item label="Your Rating" name="rating">
            <Rate allowHalf />
          </Form.Item>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Your Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter your name"
              />
            </Form.Item>

            <Form.Item
              label="Your Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter your email"
              />
            </Form.Item>
          </div>

          {/* Review Text Area */}
          <Form.Item
            label="Review"
            name="review"
            rules={[{ required: true, message: "Please write a review" }]}
          >
            <Input.TextArea
              style={{ borderRadius: "0px" }}
              rows={4}
              placeholder="Write your review here..."
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <button
              type="primary"
              htmlType="submit"
              className="bg-black text-white p-2 px-5"
            >
              Submit Review
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ReviewTab;
