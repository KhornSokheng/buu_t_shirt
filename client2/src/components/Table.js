import React from "react";

export default function Table() {
  const data_lists = [1, 3, 4, 5, 8, 10, 60];
  let i = 0;
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ข้อมูล</th>
          </tr>
        </thead>
        <tbody>
          {data_lists.map((item) => {
            i += 1;
            return (
              <tr>
                <td>{i}</td>
                <td>{item}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
