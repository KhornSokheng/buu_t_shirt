import React,{useState,useEffect} from 'react'

export default function Buydetail() {
    // const id = props.id;
    
    const [list,setList] = useState([]);
    const loadList = async()=>{
        try {
            const resp = await fetch(`http://localhost:5000/getBuydetail`)
            const jsonData = await resp.json();

            setList(jsonData);

            console.log("Resp",resp);
            console.log("List:",list);

        }   catch (err) {
            console.error(err.message);
        }
    }
      useEffect(()=>{
          console.log("Enter useEffect()");
          loadList();
      },[])
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Buy Id</th>
                        <th>Item</th>
                        <th>Full Product Id</th>
                        <th>Product Name</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Buy Amount</th>
                        <th>Buy Cost</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            list.map(elt=>{
                                return(
                                    <tr>
                                    <td>{elt.buy_id}</td>
                                    <td><a>{elt.item}</a></td>
                                    <td>{elt.full_prod_id}</td>
                                    <td>{elt.prod_name}</td>
                                    <td>{elt.color}</td>
                                    <td>{elt.size}</td>
                                    <td>{elt.buy_amount}</td>
                                    <td>{elt.buy_cost}</td>
                                    </tr>
                                )
                            })
                        }
                    
                </tbody>
            </table>
        </div>
    )
}
