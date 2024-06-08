import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payments/all`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =  10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(orders) ? orders.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Delete item
  const handleDeleteItem = (item) => {
    console.log(item._id)
  }

  // Confirm order
  const confirmOrder = async(item) => {
    console.log(item)
    await axiosSecure.patch(`/payments/${item._id}`)
      .then(res =>{
          console.log(res.data)
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Order Confirmed Now!`,
              showConfirmButton: false,
              timer: 1500
          });
          refetch();
      });
  }

  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Bookings!</span>
      </h2>

      {/* Menu items table */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="7">Error loading data.</td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.transitionId}</td>
                    <td>${item.price}</td>
                    <td>{item.status}</td>
                    <td className="text-center">
                      {item.status === "confirmed" ? "done" : (
                        <button
                          className="btn bg-green text-white btn-xs text-center"
                          onClick={() => confirmOrder(item)}
                        >
                          <GiConfirmed />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaTrashAlt className="text-red"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft/> Previous 
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= (Array.isArray(orders) ? orders.length : 0)}
          className="btn btn-sm bg-green text-white"
        >
          Next  <FaArrowRight/>
        </button>
      </div>
    </div>
  );
}

export default ManageBookings;
