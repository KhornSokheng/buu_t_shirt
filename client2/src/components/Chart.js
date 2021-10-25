import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Form from "react-bootstrap/Form";

export default function Chart() {
  const [list, setList] = useState([]);
  const [buy_list,setBuylist] = useState([]);
  const [sale_date, setDate] = useState([]);
  const [profit,setProfit] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getChart`);
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Resp", resp);
      console.log("List:", list);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, [profit]);

    const chart_1_date = list.map(x=>{
     return x.sale_date
     
  });
  const chart_1_cost = list.map(x=>{
    return x.cost
    
 });
 const chart_1_price = list.map(x=>{
  return x.price
  
});
const chart_1_profit = list.map(x=>{
  return x.profit
  
});
  return (
    <div className="container">
      <h2>Chart</h2>
      
        
          <Line
            data={{
              labels: chart_1_date,
              datasets: [
                {
                  label: "Cost",
                  borderWidth: 2,
                  borderColor: "pink",
                  data: chart_1_cost,
                  backgroundColor: "pink",
                },
                {
                  label: "Price",
                  borderWidth: 2,
                  borderColor: "red",
                  data: chart_1_price,
                  backgroundColor: "red",
                },
                {
                  label: "Profit",
                  borderWidth: 2,
                  borderColor: "green",
                  data: chart_1_profit,
                  backgroundColor: "green",
                },
              ],
            }}
            width={100}
            height={50}
            options={{ maintainAspectRatio: true }}
          />
        
      
    </div>
  );
}
