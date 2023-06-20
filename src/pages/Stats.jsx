import { Modal, Stat } from "../components";
import { useState } from "react";

import _ from 'lodash'
export default function Stats({sales, items}){
 const [open, setOpen] = useState(false)
 const [details, setDetails] = useState([])

 const getCount = () => {
    const itemsLeft = _.sumBy(items, item => item.quantity)
    const itemsSold = _.sumBy(sales, item => item.quantity)

    return [itemsLeft, itemsSold]
 }

 const getSalesOfItem = (name) => {
    const thisItem = _.filter(sales, sale => sale.name === name)

    return _.sumBy(thisItem, count => count.quantity)
 }


 const previewModal = (name) => {
    const detail = _.filter(sales, sale => sale.name === name)

    if(detail.length >= 1){
        setDetails(detail)
        setOpen(true)
    }
 }
    return(
        <section className="flex-1 mt-[50px] relative">
            <div className="flex justify-around p-2">
                <div>
                    <p className="text-xs">Items Left</p>
                    <h3 className="text-3xl">{getCount()[0]}</h3>
                </div>

                <div >
                    <p className="text-xs">Items Sold</p>
                    <h3 className="text-3xl">{getCount()[1]}</h3>
                </div>
            </div>
            <div className="mt-3 bg-white p-2">
                <h3>Products Lists</h3>
            </div>
            <div className="flex flex-col">
                {items.map((info, idx) => (
                    <Stat key={idx} getSold={getSalesOfItem} item={info} showModal={previewModal}/>
                ))}
             
            </div>
            {(details.length > 0 && open) && <Modal details={details} closeModal={() => setOpen(false)}/>}
        </section>
    )
}