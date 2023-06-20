import MTable from "mui-datatables";
export default function Table({items, sales}) {

  // console.log(sales);
   const options = {
    filter: false,
    selectableRows: "none",
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: true,
   }

   const product_columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "desc",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dateAdded",
      label: "Date Added",
      options: {
        filter: true,
        sort: true,
      },
    },
   ]

   const sales_columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "totalPrice",
      label: "Cost",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "time",
      label: "Date Purchased",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "saleType",
      label: "Sale Type",
      options: {
        filter: true,
        sort: true,
      },
    },
   ]




  return (
    <div className="flex flex-col my-[70px] p-3">
      <MTable title="Products"  data={items} columns={product_columns} options={options}/>
      <div className="my-2"></div>
      <MTable title="Sales" columns={sales_columns} data={sales} options={options} />
    </div>
  );
}
