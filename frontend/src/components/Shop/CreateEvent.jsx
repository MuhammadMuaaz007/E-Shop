import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

import { resetCreateEvent } from "../../redux/reducers/event";
import { createEvent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { error, createSuccess } = useSelector((state) => state.event);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [stock, setStock] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (createSuccess) {
      toast.success("Event Created Successfully");
      dispatch(resetCreateEvent());
      navigate("/dashboard-events");
    }
  }, [dispatch, error, navigate, createSuccess]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newForm = new FormData();

      images.forEach((image) => {
        newForm.append("images", image);
      });
      newForm.append("name", name);
      newForm.append("description", description);
      newForm.append("category", category);
      newForm.append("tags", tags);
      newForm.append("originalPrice", originalPrice);
      newForm.append("discountPrice", discountPrice);
      newForm.append("stock", stock);
      newForm.append("shopId", seller._id);
      newForm.append("start_date", startDate.toISOString());
      newForm.append("finish_date", endDate.toISOString());
      dispatch(createEvent(newForm));
    } catch (error) {
      toast.error("Failed to create event");
      console.log(error);
    }
  };
  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Add 3 days
    setStartDate(startDate);
    setEndDate(null); // Clear end date to force user to select again
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };
  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  return (
    <div className="w-[90%] md:w-[70%] bg-white shadow-2xl h-[80vh] rounded-lg p-6 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
            required
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
            required
            rows="5"
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Choose a category"> Choose a category </option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option key={index} value={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        {/* Tags */}
        <div className="flex flex-col">
          <label className="font-medium">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter event product tags..."
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium">Original Price</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
              className="mt-2 px-3 py-2 border border-gray-300 rounded 
              focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter discounted price"
              required
              className="mt-2 px-3 py-2 border border-gray-300 rounded 
              focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="flex flex-col">
          <label className="font-medium">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter event product stock"
            required
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {/* Event Dates */}
        <div className="flex flex-col">
          <label className="font-medium">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            id="start-date"
            onChange={handleStartDateChange}
            required
            min={today}
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            id="end-date"
            onChange={handleEndDateChange}
            required
            min={minEndDate}
            className="mt-2 px-3 py-2 border border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Images */}
        <div className="flex flex-col">
          <label className="font-medium">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            required
            onChange={handleImageChange}
          />
          <label
            htmlFor="upload"
            className="mt-2 flex items-center cursor-pointer text-black hover:text-gray-700"
          >
            <AiOutlinePlusCircle size={30} />
            <span className="ml-2">Add Images</span>
          </label>

          <div className="flex flex-wrap mt-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded border"
                />
                <AiOutlineClose
                  size={20}
                  className="absolute top-1 right-1 cursor-pointer text-black bg-white rounded-full"
                  onClick={() => removeImage(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
