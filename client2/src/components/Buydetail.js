import React from "react";

export default function Buydetail() {
  const [list, setList] = useState([]);
  const loadList = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getBuydetail");
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
  }, []);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Buy id</th>
            <th>Item</th>
            <th>full product id</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.buy_date.slice(0, 10)}</td>
                <td>
                  <a href="#">{elt.buy_id}</a>
                </td>
                <td>{elt.buy_status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
