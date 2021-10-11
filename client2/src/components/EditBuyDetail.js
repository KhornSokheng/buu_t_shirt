import React,{useState} from 'react'

export default function EditBuyDetail(props) {

    const [buy_id,setId]=useState(props.buy_id);
    const [Item,setItem]=useState(props.Item);
    const [full_prod_id,setFull]=useState(props.full_prod_id);
    const [prod_name,setName]=useState(props.prod_name);
    const [color,setColor]=useState(props.color);
    const [size,setSize]=useState(props.size);
    const [buy_amount,setAmount]=useState(props.buy_amount);
    const [buy_cost,setCost]=useState(props.buy_cost);

    return (
        <div>
            <button
                      type="button"
                      className="btn btn-warning"
                      data-toggle="modal"
                      data-target={`#buy_id${buy_id}`}
                    >
                      แก้ไข
                    </button>
        </div>
    )
}
