import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Image from "./assets/pngwing.com.png";

const houseTypes = [
  "VILLA",
  "SINGLE_HOUSE",
  "FARM_HOUSE",
  "BIFAMILIAR_HOUSE",
  "ROW_HOUSE",
  "MULTIPLE_DWELLING",
  "CHALET",
  "TERRACE_HOUSE",
];

const balconyOptions = ["Yes", "No"];

function App() {
  const [formData, setFormData] = useState({
    HouseType: "",
    LotSize: "",
    Balcony: "",
    LivingSpace: "",
    NumberRooms: "",
    YearBuilt: "",
    PostalCode: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData); // Adicionando log dos dados do formulário
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      console.log("Response data:", response.data); // Adicionando log dos dados de resposta
      setPredictedPrice(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-4 text-red-700 font-serif w-/4 h-full flex-col justify-center align-middle items-center pt-44">
      <div className="flex flex-col justify-center align-middle items-center">
        <img src={Image} alt="Toblehome Logo" className="w-24 h-24 mx-auto" />
        <h1 className="text-5xl font-bold flex justify-center items-center pb-12">
          TobleHome
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="HouseType">
              House Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="HouseType"
              name="HouseType"
              value={formData.HouseType}
              onChange={handleChange}
            >
              <option value="">Select House Type</option>
              {houseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Balcony">
              Balcony
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Balcony"
              name="Balcony"
              value={formData.Balcony}
              onChange={handleChange}
            >
              <option value="">Select Balcony</option>
              {balconyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="LotSize">
              Lot Size
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LotSize"
              type="number"
              placeholder="Lot Size"
              name="LotSize"
              value={formData.LotSize}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="LivingSpace">
              Living Space
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LivingSpace"
              type="number"
              placeholder="Living Space"
              name="LivingSpace"
              value={formData.LivingSpace}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="NumberRooms">
              Number of Rooms
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="NumberRooms"
              type="number"
              placeholder="Number of Rooms"
              name="NumberRooms"
              value={formData.NumberRooms}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="YearBuilt">
              Year Built
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="YearBuilt"
              type="number"
              placeholder="Year Built"
              name="YearBuilt"
              value={formData.YearBuilt}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="PostalCode">
              Postal Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PostalCode"
              type="text"
              placeholder="Postal Code"
              name="PostalCode"
              value={formData.PostalCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className="bg-red-600 mt-12 uppercase font-semibold hover:bg-red-700 text-white py-4 px-8 text-2xl rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Predict Price
        </button>
      </form>
      {predictedPrice !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Predicted Price:</h2>
          <p className="text-xl text-green-700">{predictedPrice} CHF</p>
        </div>
      )}
    </div>
  );
}

export default App;
