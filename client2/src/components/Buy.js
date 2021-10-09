import React,{useState,useEffect} from 'react'

export default function Buy() {
    const [list,setList] = useState([]);
    const loadList = async()=>{
        try {
            const resp = await fetch("http://localhost:3000/getBuy")
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
      })
    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Buy date</th>
                        <th>Buy id</th>
                        <th>Buy status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            list.map(elt=>{
                                return(
                                    <tr>
                                    <td>{elt.buy_date}</td>
                                    <td>{elt.buy_id}</td>
                                    <td>{elt.buy_status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
