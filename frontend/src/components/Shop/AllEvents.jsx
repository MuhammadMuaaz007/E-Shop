import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsShop, deleteEvent } from "../../redux/actions/event";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  console.log("Events:", events);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(id));
      toast.success("Event deleted successfully");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      {events && events.length > 0 ? (
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                #
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Product ID
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Price (USD)
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Sold
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr
                key={event._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-mono text-sm break-all">
                  {event._id}
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  {event.images[0] && (
                    <img
                      src={event.images[0].url}
                      alt={event.name}
                      className="w-12 h-12 flex-shrink-0 object-cover rounded"
                    />
                  )}
                  <span className="truncate max-w-[200px]" title={event.name}>
                    {event.name}
                  </span>
                </td>

                <td className="px-4 py-3">${event.discountPrice}</td>
                <td className="px-4 py-3">{event.stock}</td>
                <td className="px-4 py-3">{event.sold_out}</td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <Link
                    to={`/product/${event._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Preview
                  </Link>
                  <button
                    onClick={() => deleteHandler(event._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-10 text-gray-500">No events found</p>
      )}
    </div>
  );
};

export default AllEvents;
