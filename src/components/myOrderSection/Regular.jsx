import React from "react";
import Image from "next/image";

const OrderTable = ({ myOrder }) => {

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            
            <th className="py-3 px-5 border-b">Date</th>
            <th className="py-3 px-5 border-b">Product</th>
            <th className="py-3 px-5 border-b">Total</th>
            <th className="py-3 px-5 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {myOrder?.map((order, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
             
              <td className="py-4 px-5">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-5 flex items-center space-x-3">
                <Image
                  src={order?.ready_made_details?.products[0]?.product_id?.image_urls[0]}
                  alt={order?.ready_made_details?.products[0]?.product_id?.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">
                    {order?.ready_made_details?.products[0]?.product_id.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    x {order?.ready_made_details?.products[0]?.quantity}
                  </p>
                </div>
              </td>
             
              <td className="py-4 px-5 font-medium">
                ${order?.totalPrice}
              </td>
              <td
                className={`py-4 px-5 font-medium ${
                  order?.order_status === "Completed"
                  ? "text-green-600"
                  : order?.order_status === "Shipped"
                  ? "text-blue-600"
                  : order?.order_status === "Canceled"
                  ? "text-red-600"
                  : order?.order_status === "In Progress"
                  ? "text-yellow-600"
                  :'text-cyan-700'
                }`}
              >
                {order?.order_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
