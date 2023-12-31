import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdDelete,
  MdCancel,
  MdWarning,
  MdCheckCircle,
} from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";
import { addData, deleteData, updateDocument } from "../functions/calls";
import _ from "lodash";
import { Link } from "react-router-dom";

export const Item = ({ item, initSale }) => {
  return (
    <div className="flex relative flex-col m-1 bg-white shadow-md w-[170px] md:w-1/4">
      <img src={item.photo} alt="" className="w-full h-20 object-cover" />
      <div className="absolute flex items-center top-1 right-1">
        <Link to={`/add-product?id=${item.id}`}>
          <button className="rounded-full p-1 bg-green-300">
            <FiEdit2 className="text-xs" />
          </button>
        </Link>

        <button
          onClick={() => deleteData({ path: "products", id: item.id })}
          className="rounded-full p-1 bg-red-700 ml-2"
        >
          <MdDelete className="text-white text-xs" />
        </button>
      </div>
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
  const getTotal = _.sumBy(details, (info) => info.totalPrice);
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

      <table class="table-auto w-full">
        <thead className="text-left">
          <tr className="text-sm p-3">
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {details?.map((info, idx) => (
            <tr className="text-xs w-full" key={idx}>
              <td className="p-1">{info.name}</td>
              <td>¢ {info.price}</td>
              <td>{info.quantity}</td>
              <td>{info.totalPrice - (info.quantity * info.receiptPrice)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="text-center bg-black p-2">
          <td colSpan={4} className="p-1 mt-2 text-center text-white">
            {getTotal} cedis
          </td>
        </tfoot>
      </table>
    </div>
  );
};

export const SellModal = ({ closeModal, item }) => {
  const [saleType, setSaleType] = useState("Retail");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(item.price.retailPrice);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errType, setErrType] = useState("");

  const completeSale = (e) => {
    e.preventDefault();

    const data = {
      name: item.name,
      quantity,
      saleType,
      price,
      receiptPrice: item.price.receiptPrice,
      totalPrice: quantity * price,
      time: new Date().toLocaleString("ru"),
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
          .then(() => {
            setMessage("Sales Successfully Recorded");
            setOpen(true);
            setErrType("success");
            closeModal(false);
          })
          .catch((err) => {
            setMessage(err.message);
            setOpen(true);
            setErrType("error");
            closeModal(false);
          });
      })
      .catch((err) => {
        setMessage(err.message);
        setOpen(true);
        setErrType("error");
        closeModal(false);
      });
  };
  return (
    <section className="w-3/4 md:w-[400px] fixed mx-1 min-h-[45vh] shadow-xl bg-blue-300 p-2 z-[50000] slide-up">
      {open && <Feedback message={message} type={errType} close={setOpen} />}
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
        <div className="flex w-full mb-1">
          <select
            required
            className="p-2 mr-1  bg-white w-1/2"
            onChange={(e) => setSaleType(e.target.value)}
          >
            <option value="">Sale Type</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Retail">Retail</option>
          </select>

          <input
            type="number"
            min={1}
            max={item.quantity}
            className="p-2  w-1/2 "
            placeholder="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <div className="flex w-full mb-1">
          <input
            type="number"
            value={price}
            className="p-2 w-1/2 mr-1"
            placeholder="Price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            type="number"
            className="p-2 w-1/2"
            placeholder="Cost"
            value={quantity * price}
            onChange={(e) => {}}
          />
        </div>

        <button
          type="submit"
          disabled={!quantity}
          className="text-white bg-black p-2 mt-2"
        >
          Complete Sale
        </button>
      </form>
    </section>
  );
};

export const Feedback = ({ type, message, close }) => (
  <div
    className={`flex items-center absolute move-up p-2 w-full md:w-[270px] justify-between md:right-0 z-[5000] ${
      type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
  >
    <span>
      {type === "success" ? (
        <MdCheckCircle className="text-white text-2xl" />
      ) : (
        <MdWarning className="text-white text-2xl" />
      )}
    </span>{" "}
    <p className="text-xs p-2">{message}</p>
    <button onClick={() => close(false)}>
      <MdCancel className="text-lg text-white" />
    </button>
  </div>
);
