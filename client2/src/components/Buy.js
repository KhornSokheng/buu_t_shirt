import React,{useState,useEffect} from 'react'

export default function Buy() {
    const [list,setList] = useState([]);
    const loadList = async()=>{
        try {
            const resp = await fetch("http://localhost:5000/getBuy")
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
                        <th>Buy date</th>
                        <th>Buy id</th>
                        <th>Buy status</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            list.map(elt=>{
                                
                                return(
                                    <tr>
                                    <td>{elt.buy_date.slice(0, 10)}</td>
                                    <td><a href="#">{elt.buy_id}</a></td>
                                    <td>{elt.buy_status}</td>
                                    </tr>
                                )
                            })
                        }
                    
                </tbody>
            </table>
        </div>
    )
}
