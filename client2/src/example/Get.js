import React, {useEffect, useState} from "react";
import EditComp from './EditComp';

export default function Get() {

    const [list, setList] = useState([]);

    const deleteItem = async(id)=>{
      try{
        // console.log("ID", id);
        const del = await fetch(`http://localhost:4000/delete/${id}`, {
          method: "DELETE"
        })
        setList(list.filter(elt=>{
          return elt.id !== id;
        }))
      }catch (err){
        console.log(err.message)
      }
    } 

    const loadList = async ()=>{
        try {
            const resp = await fetch("http://localhost:4000/getData")
            const jsonData = await resp.json();

            setList(jsonData);

            console.log("Response", resp);
            console.log("List: ", list)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        console.log("Enter useEffect")
        loadList();
    },[])

  return (
    <div className="container">
      <table className="table mt-5 table-dark table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Fruit Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          
          {
              list.map(elt =>{
                  return (
                      <tr>
                        <td>{elt.id}</td>
                        <td>{elt.name}</td>
                        <td>{elt.price}</td>
                        <td><EditComp
                          id={elt.id}
                          name={elt.name}
                          price={elt.price}
                        /></td>
                        <td><button className= "btn btn-danger"
                          onClick = {()=>deleteItem(elt.id)}
                        >Delete</button></td>
                      </tr>
                  )
              })
          }
          
        </tbody>
      </table>
    </div>
  );
}
