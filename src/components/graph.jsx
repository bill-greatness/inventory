import Chart from "react-apexcharts";


var options = {
    chart: {
      height: 280,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    }
  };

export const Visual = () => {
  const series = [
    {
      name: "Sales",
      data: [45, 52, 38, 45, 19, 23, 2],
    },
  ];
  return <Chart type="area" series={series} options={options}/>;
};
