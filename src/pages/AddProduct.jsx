import { useState } from "react";
import { addData, uploadFile } from "../functions/calls";
export default function AddProduct() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [desc, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [wholeSalePrice, setWholeSalePrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");

  const addProduct = (e) => {
    event.preventDefault();

    const data = {
      name,
      quantity,
      desc,
      photo,
      price:{
        wholeSalePrice, 
        retailPrice
      },
      dateAdded: new Date().toLocaleString(),
    };

    addData({
      path: "products",
      data,
      id: new Date().getTime().toString(),
    })
      .then(() => {
        alert("Product Successfuly Added!")
        setName("")
        setDescription("")
        setPhoto("")
        setQuantity(0)
        setWholeSalePrice(0)
        setRetailPrice(0)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form autoComplete="off" onSubmit={addProduct} className="flex flex-col my-[55px] px-3">
      <div className="flex flex-col p-1 mb-2">
        <label htmlFor="product_name" className="text-xs pb-1">
          Product Name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
          id="product_name"
          className="p-2 bg-white border border-gray-300 rounded-sm"
        />
      </div>
      <div className="flex flex-col  p-1 mb-2">
        <p className="text-xs pb-1">Product Image</p>
        <label
          htmlFor="product_img"
          className={`w-full ${
            photo ? "bg-green-500 text-white" : "bg-gray-400 text-white"
          } p-2`}
        >
          {photo ? "Image Uploaded" : "Add Image"}
        </label>
        <input
          required
          className="hidden"
          onChange={(e) =>
            uploadFile({
              file: e.target.files[0],
              path: "store-products/",
              getLink: setPhoto,
            })
          }
          type="file"
          accept="image/*"
          id="product_img"
        />
      </div>
      <div className="flex flex-col  p-1 mb-2">
        <label htmlFor="product_price" className="text-xs pb-1">
          Price
        </label>
        <div className="flex w-full">
          <input
            value={wholeSalePrice}
            required
            onChange={(e) => setWholeSalePrice(parseFloat(e.target.value))}
            type="number"
            step={0.1}
            placeholder="Wholesale Price"
            id="product_price"
            className="p-2 bg-white w-1/2 mr-1  border border-gray-300 rounded-sm"
          />
          <input
            value={retailPrice}
            required
            onChange={(e) => setRetailPrice(parseFloat(e.target.value))}
            type="number"
            step={0.1}
            placeholder="Retail  Price"
            id="product_price"
            className="p-2 bg-white border w-1/2 border-gray-300 rounded-sm"
          />
        </div>
      </div>
      <div className="flex flex-col  p-1 mb-2">
        <label htmlFor="product_name" className="text-xs pb-1">
          Description
        </label>
        <input
          required
          value={desc}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
          id="product_name"
          className="p-2 bg-white border border-gray-300 rounded-sm"
        />
      </div>
      <div className="flex flex-col  p-1 mb-2">
        <label htmlFor="product_quantity" className="text-xs pb-1">
          Quantity
        </label>
        <input
          required
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          type="number"
          placeholder="Quantity"
          id="product_quantity"
          className="p-2 bg-white border border-gray-300 rounded-sm"
        />
      </div>
      <button
        type="submit"
        className="mx-auto bg-black text-white p-2 rounded-sm text-sm"
      >
        Add Item
      </button>
    </form>
  );
}
