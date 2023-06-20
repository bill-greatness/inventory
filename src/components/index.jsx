import { FiChevronRight } from "react-icons/fi";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";
import { addData, updateDocument } from "../functions/calls";
import _ from 'lodash'
import { Link } from "react-router-dom";

export const Item = ({ item, initSale }) => {
  return (
    <div className="flex flex-col m-1 bg-white shadow-md w-[170px] md:w-1/4">
      <img src={item.photo} alt="" className="w-full h-20 object-cover" />
      <div className="px-2">
        <h2 className="text-sm font-bold truncate pt-2">{item.name}</h2>
        <p className="text-xs overflow-hidden truncate">{item.desc}</p>
        <div className="flex justify-between my-2 items-center">
          <p className="text-sm">¢{item.price.retailPrice}</p>
          <button
            onClick={() => initSale(item)}
            className="text-xs p-1 bg-black text-white"
          >
            Sell Item
          </button>
        </div>
      </div>
    </div>
  );
};

export const MenuItem = ({ desc, path, Icon }) => (
  <Link to={path}>
    <div className="flex justify-start items-center my-3">
    <Icon className="w-6 h-6" /> <h3 className="pl-2">{desc}</h3>
  </div>
  </Link>
  
);

export const Stat = ({ item, showModal, getSold }) => {
  return (
    <button
      onClick={() => showModal(item.name)}
      className="flex justify-between bg-white border-b items-center m-1 p-2"
    >
      <div className="flex items-center ">
        <img className="w-10 h-10  object-cover" src={item.photo} alt="" />
        <span className="flex flex-col items-start pl-2">
          <h2 className="font-bold text-sm">{item.name}</h2>
          <div className="flex ">
            <span className="flex">
              {" "}
              <MdOutlineArrowDropUp className="text-green-700" />
              <p className="text-xs">Left: {item.quantity}</p>{" "}
            </span>
            <span className="flex">
              {" "}
              <MdOutlineArrowDropDown className="text-red-700" />
              <p className="text-xs">Sold: {getSold(item.name)}</p>{" "}
            </span>
          </div>
        </span>
      </div>
      <FiChevronRight className="w-6 h-6 text-gray-400" />
    </button>
  );
};

export const Modal = ({ closeModal, details, is_daily }) => {
  const getTotal = _.sumBy(details, info => info.totalPrice)
  return (
    <div className="transition duration-1000 ease-in-out sticky overflow-y-scroll bottom-0 w-full p-2  h-[40vh] bg-red-200 z-[5000]">
      <div className="flex justify-between p-3">
        <h3 className="text-lg font-bold">Sales Information</h3>
        <button
          onClick={closeModal}
          className="w-6 h-6 flex items-center justify-center sticky z-50 right-2 top-2 text-white rounded-full bg-red-500"
        >
          <CgCloseO className="w-6 h-6" />
        </button>
      </div>

      <table class="table-fixed w-full">
        <thead className="text-left">
          <tr className="text-sm p-3">
            <th>Item</th>
            <th>Price</th>
            <th>Date Purchased</th>
          </tr>
        </thead>
        <tbody>
          {details?.map((info, idx) => (
            <tr className="text-xs w-full" key={idx}>
              <td className="p-1">{info.name}</td>
              <td>¢ {info.totalPrice}</td>
              <td>
                {is_daily === true ? new Date(info.timeStamp.toDate()).toLocaleTimeString()  : new Date(info.timeStamp.toDate()).toLocaleDateString("ru")}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="text-center bg-black p-2">
            <td colSpan={3} rowSpan={3} className="p-1 mt-2 text-white">{getTotal} cedis</td>
        </tfoot>
      </table>
    </div>
  );
};

export const SellModal = ({ closeModal, item }) => {
  const [saleType, setSaleType] = useState("Retail");
  const [quantity, setQuantity] = useState(1);
  const [receiptID, setReceiptID] = useState("");

  const completeSale = (e) => {
    e.preventDefault();

    const price =
      saleType === "Retail"
        ? item.price.retailPrice
        : item.price.wholeSalePrice;
    const data = {
      name: item.name,
      quantity,
      saleType,
      receiptID,
      price,
      totalPrice: quantity * price,
      time: new Date().toLocaleString(),
    };

    addData({
      path: "sales",
      data,
      id: new Date().getTime().toString(),
    })
      .then(() => {
        updateDocument({
          path: "products",
          id: item.id,
          data: {
            quantity: item.quantity - quantity,
            lastUpdate: new Date().toString(),
          },
        })
          .then(() => alert("Sale Successful"))
          .then(() => closeModal(false))
          .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
  };
  return (
    <section className="w-3/4 md:w-[400px] fixed mx-1 min-h-[50vh] shadow-xl bg-blue-300 p-2 z-[50000] slide-up">
      <form onSubmit={completeSale} className="flex flex-col p-2 w-full h-full">
        <h3 className="font-bold p-2">Sale Details</h3>
        <button
          type="button"
          onClick={() => closeModal(false)}
          className="w-6 h-6 bg-red-700 absolute top-[-10px] text-red-50  font-bold right-[5px] rounded-full"
        >
          x
        </button>
        <input
          type="text"
          className="p-1 mb-1"
          placeholder="Item Name"
          value={item.name}
          onChange={() => {}}
        />
        <input
          required
          className="p-1 mb-1"
          type="text"
          placeholder="Receipt Number"
          onChange={(e) => setReceiptID(e.target.value)}
        />
        <select
          required
          className="p-1 mb-1 bg-white"
          onChange={(e) => setSaleType(e.target.value)}
        >
          <option value="">Sale Type</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Retail">Retail</option>
        </select>
        <div className="flex w-full">
          <input
            type="number"
            min={1}
            max={item.quantity}
            className="p-1 mb-1 w-1/2 mr-1"
            placeholder="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />

          <input
            type="number"
            value={
              saleType === "Retail"
                ? item.price.retailPrice
                : item.price.wholeSalePrice
            }
            className="p-1 mb-1 w-1/2"
            placeholder="Price"
            onChange={(e) => {}}
          />
        </div>

        <input
          type="number"
          className="p-1 mb-1"
          placeholder="Cost"
          value={
            quantity *
            (saleType === "Retail"
              ? item.price.retailPrice
              : item.price.wholeSalePrice)
          }
          onChange={(e) => {}}
        />

        <button
          type="submit"
          disabled={!receiptID || !quantity}
          className="text-white bg-black p-1 mt-2"
        >
          Complete Sale
        </button>
      </form>
    </section>
  );
};
