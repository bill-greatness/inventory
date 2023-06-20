import { useContext, useEffect, useMemo, useState } from "react";
import { Item, SellModal } from "../components";
import { readData } from "../functions/calls";
import { SearchContext } from "../assets/data";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const search = useContext(SearchContext);

  const searchingFor = search.searchInfo

  useEffect(() => {
    readData({ path: "products", getData: setProducts });
  },[]);

  useEffect(() => {
    const temp = []
  
    if (search.active === true && searchingFor.trim() !== "") {
      const regex = new RegExp(searchingFor, 'i')
      for(const item of products){
        if(regex.test(item.name) || regex.test(item.desc)){
          temp.push(item)
        }
      }
      setProducts(temp)
    }else{
      readData({ path: "products", getData: setProducts });
    }
  }, [search]);


  const initSale = (data) => {
    setItem(data);
    setOpen(true);
  };

  // console.log(search);

  return (
    <main className="w-full my-[100px]">
      <div className="flex flex-row flex-wrap justify-center">
        {products?.map((info, idx) => (
          <Item key={idx} item={info} initSale={initSale} />
        ))}
      </div>

      {open && <SellModal item={item} closeModal={setOpen} />}
    </main>
  );
}
