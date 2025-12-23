import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/actions/product";
import { resetCreateProduct } from "../../redux/reducers/product";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { error, createSuccess } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const [stock, setStock] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (createSuccess) {
      toast.success("Product Created Successfully");
      dispatch(resetCreateProduct());
      navigate("/dashboard");
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
      dispatch(createProduct(newForm));
    } catch (error) {
      toast.error("Failed to create product");
      console.log(error);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] bg-white shadow-2xl h-[80vh] rounded-lg p-6 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create Product
      </h1>

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
            placeholder="Enter your product name..."
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
            placeholder="Enter your product description..."
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
            placeholder="Enter product tags..."
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
            placeholder="Enter product stock"
            required
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
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
