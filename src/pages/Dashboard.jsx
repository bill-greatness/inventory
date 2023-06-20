import _ from "lodash";
import { months } from "../assets/data";
import { Visual } from "../components/graph";
import { useState } from "react";
import { Modal } from "../components";

export default function Dashboard({ items, sales }) {
  const itemLeft = _.sumBy(items, (itm) => itm.quantity);
  const itemSold = _.sumBy(sales, (itm) => itm.quantity);
  const [salesData, setTodaySales] = useState([])
  const [month, setMonth] = useState(new Date().getMonth());

  const [open, setOpen] = useState(false)


  const getMonthlyRevenue = () => {
    const thisMonthSales = _.filter(
      sales,
      (sl) => sl.timeStamp.toDate().getMonth() === month
    );

    return _.sumBy(thisMonthSales, (tms) => tms.totalPrice) || 0.0;
  };

  const getDailySales = () => {
    const salesInfo = _.groupBy(sales, (sls) =>
      sls.timeStamp.toDate().toLocaleDateString("ru")
    );
    const groupedData = [];
    Object.entries(salesInfo).forEach(([key, value]) => {
      groupedData.push({
        day: key,
        sales: _.sumBy(value, (vl) => vl.totalPrice),
        info:value
      });
    });

    return groupedData;
  };

  const viewModal = (info) => {
    setTodaySales(info)
    setOpen(true)
  }

  // getDailySales()

  // getMonthlyRevenue()
  return (
    <main className="flex relative flex-col my-[50px] p-2">
      <div className="flex justify-around">
        <div className="flex justify-center flex-col w-1/2 h-[120px] mr-1 rounded-md bg-cyan-700 pl-2">
          <img
            className="w-10"
            src="https://cdn4.iconfinder.com/data/icons/business-1221/24/Donuts_Chart-256.png"
          />
          <h3 className="text-xl my-2 text-white">{itemLeft}</h3>
          <p className="text-xs text-gray-50">Products In</p>
        </div>

        <div className="flex justify-center flex-col rounded-md  w-1/2 h-[120px] bg-teal-600 pl-2">
          <img
            className="w-10"
            src="https://cdn4.iconfinder.com/data/icons/business-1221/24/Pie_Chart-512.png"
          />
          <h3 className="text-xl my-2 text-white">{itemSold}</h3>
          <p className="text-xs text-gray-50">Products Out</p>
        </div>
      </div>
      {/* Months Tiles */}
      <div className="flex my-4 overflow-x-scroll">
        {months.map((info, idx) => (
          <button
            className={`${
              month === idx ? "bg-green-700 text-white rounded-t-xl" : ""
            } text-xs p-2 mr-[1px] text-gray-500`}
            onClick={() => setMonth(idx)}
            key={idx}
          >
            {info}
          </button>
        ))}
      </div>
      {/* Revenue Here */}
      <div className="my-2">
        <h2 className="text-xs text-gray-500">Sales This Month</h2>
        <h3 className="font-bold text-xl">¢{Number((getMonthlyRevenue()).toFixed()).toLocaleString()}</h3>
      </div>

      <div className="flex flex-col md:flex-row">

       <div className="md:w-1/2">
        <Visual />
        </div> 
      
      {/* Daily Records  */}
      <div className="flex flex-col bg-white p-1 md:w-1/2">
        <h3 className="font-bold">Daily Sale Records</h3>
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-sm p-3 font-bold ">
              <td>Date</td>
              <td>Sales</td>
            </tr>
          </thead>
          <tbody>
            {/* this needs to be paginated */}
            {getDailySales()?.map((sls, idx) => (
              <tr onClick={() => viewModal(sls.info)} className="text-xs" key={idx}>
                <td className="p-2">{sls.day}</td>
                <td>GHS {sls.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {open && <Modal is_dialy={true} closeModal={() => setOpen(false)} details={salesData}/>}
      </div> 
      </div>
      

    </main>
  );
}
