import React from "react";
import Image from "next/image";

const Custom = ({ myCustomOrder }) => {
  console.log(myCustomOrder);

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
         
            <th className="py-3 px-5 border-b">Date</th>
            <th className="py-3 px-5 border-b">Jewelry Type</th>
            <th className="py-3 px-5 border-b">Description</th>
            <th className="py-3 px-5 border-b">Image</th>
            <th className="py-3 px-5 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {myCustomOrder?.map((order, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              
              <td className="py-4 px-5">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-5">{order?.custom_order_details?.jewelry_type}</td>
              <td className="py-4 px-5 font-medium">{order?.custom_order_details?.description}</td>
              <td className="py-4 px-5 flex items-center space-x-3">
                <Image
                  src={order?.custom_order_details?.image_url}
                  alt="Jewelry"
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover rounded-md"
                />
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

export default Custom;
