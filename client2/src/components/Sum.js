import React from 'react'

export default function Sum() {

    const data_lists = [1,3,4,5,8,10,60]
    let total = 0;

    for(let i=0; i<data_lists.length;i++){
        total+= data_lists[i]
    }

    return (
        <div className="container">
            <h2>Final Exam, Q3</h2>
            <h2>Mr. Khorn Sokheng, 62310045</h2>

            <h1 className="text-danger">The Sum is {total}</h1>
        </div>
    )
}
