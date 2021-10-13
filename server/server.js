const express = require("express");
const mysql = require("mysql");
const app = express();
const port = "5000";
const pool = require("./connect_db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server started on port ${port}...`);
});

// Routes
// get all products in warehouse (OK)
app.get("/getWarehouse", (req, res) => {
  try {
    const sql = "SELECT * from warehouse";
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get products with id in warehouse (OK)
app.get("/getWarehouse/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `SELECT * from warehouse where full_prod_id = "${id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get all products in warehouse view (OK)
app.get("/getWarehouseView", async (req, res) => {
  try {
    const sql = "SELECT * from warehouse_view";
    await pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get all customers (OK)
app.get("/getCustomer", (req, res) => {
  try {
    // let {id} = req.params;

    const sql = `SELECT * from customer`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all size (OK)
app.get("/getSizeChart", (req, res) => {
  try {
    const sql = `SELECT * from size_chart`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all remaining size using prod-id and color (OK)
// Switch from GET to POST method
app.post("/getSizeRemain", async (req, res) => {
  try {
    // const {color} = req.params;
    const { prod_id, color,prod_color_id } = req.body;
    // const sql = `SELECT color, size FROM warehouse_view
    //     WHERE total_amount - sold_amount >0
    //     AND prod_id = "${prod_id}"
    //     AND color LIKE "%${color}%" LIMIT 5`;
    const sql = `SELECT color, size FROM warehouse_view
    WHERE total_amount - sold_amount >0
    AND prod_color_id = "${prod_color_id}" LIMIT 5`;
    console.log(sql);
    await pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get all remaining size using prod-id and color (OK)
// Switch from GET to POST method
app.post("/getColorRemain", async (req, res) => {
  try {
    // const {color} = req.params;
    const { prod_id } = req.body;
    const sql = `SELECT DISTINCT prod_id,color FROM warehouse_view
        WHERE total_amount - sold_amount >0
        AND prod_id = "${prod_id}"`;
    console.log(sql);
    await pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get all buy (OK)
app.get("/getBuy", (req, res) => {
  try {
    const sql = `SELECT DATE_FORMAT(buy_date, "%W %e %M %Y") AS buy_date, buy_id, buy_status FROM buy`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all buy detail (OK)
app.get("/getBuydetail", (req, res) => {
  try {
    const sql = `SELECT BD.buy_id,BD.item,BD.full_prod_id,BD.buy_amount,BD.buy_cost,WV.prod_name,WV.color,WV.size FROM buy_detail BD
        JOIN warehouse_view WV
        ON BD.full_prod_id = WV.full_prod_id  ORDER BY buy_id, item;`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all buy detail with buy_id (OK)
app.get("/getBuydetail/:id", (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      `SELECT BD.buy_id,BD.item,BD.full_prod_id,BD.buy_amount,BD.buy_cost,WV.prod_name,WV.color,WV.size FROM buy_detail BD
        JOIN warehouse_view WV
        ON BD.full_prod_id = WV.full_prod_id WHERE buy_id like "%` +
      `${id}" ORDER BY buy_id, item;`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      console.log(sql);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all sale (OK)
app.get("/getSale", (req, res) => {
  try {
    const sql = `SELECT * from sale`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all sale detail (OK)
app.get("/getSaledetail", (req, res) => {
  try {
    const sql = `SELECT * from sale_detail`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get all product (OK)
app.get("/getProduct", (req, res) => {
  try {
    const sql = `SELECT * from product`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// get product with id (OK)
app.get('/getProduct/:id', (req, res) =>{

    try {

        const prod_color_id = req.params.id;
        // const color = req.params.color;
        // const sql = `SELECT * from warehouse_view where prod_color_id = "${id}" GROUP BY prod_color_id`;
        // const sql = `SELECT * from warehouse_view where prod_id = "${id}" and color="${color}"  GROUP BY color LIMIT 1`;
        const sql = `SELECT * from warehouse_view where prod_color_id = "${prod_color_id}" GROUP BY color LIMIT 1;` 
        console.log(sql)
        const data = pool.query(sql, (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results);
            // console.log(data)
            res.send(results);

        });

    } catch (err) {
        console.error(err.message);
    }
})

// get all product color (OK)
app.get("/getProductColor", (req, res) => {
  try {
    const sql = `SELECT * FROM warehouse_view GROUP BY prod_color_id`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// --------------------------------------------
// post method
// insert buy
app.post("/insertBuy", (req, res) => {
  try {
    const { buy_id, buy_date, buy_status } = req.body;
    const sql = `INSERT INTO buy(buy_id,buy_date,  buy_status) VALUES ('${buy_id}','${buy_date}','${buy_status}')`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
    // console.log(req.body)
  } catch (err) {
    console.error(err.message);
  }
});

// insert buy detail
// trigger will be called to update product in warehouse
app.post("/insertBuyDetail", async (req, res) => {
    try {
      const { buy_id, prod_name,color,size, buy_amount, buy_cost } = req.body;
      
      
      const sql = `CALL insert_buy_detail('${buy_id}','${prod_name}','${color}','${size}','${buy_amount}','${buy_cost}')`;
      console.log(sql);
      pool.query(sql, async (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
        console.log("ID: ", full_prod_id);
        res.send(results);
      });
      // console.log(req.body)
    } catch (err) {
      console.error(err.message);
    }
  });

// ERROR:
// app.post("/insertBuyDetail", async (req, res) => {
//   try {
//     const { buy_id, prod_name,color,size, buy_amount, buy_cost } = req.body;
//     //get the full_prod_id first
//     let full_prod_id;
//     const sql1 = `SELECT full_prod_id FROM warehouse_view
//     WHERE prod_name = "${prod_name}"
//     AND color ="${color}"
//     AND size = "${size}"`
//     const data = await pool.query(sql1, async(err, results) => {
//         if (err) {
//           throw err;
//         }
//         console.log(results);
//         console.log(data);
//         full_prod_id = await results[0].full_prod_id;
//         console.log("ID: ", full_prod_id);
//         res.send(results);
//       });
    
//     const sql2 = `CALL insert_buy_detail('${buy_id}','${full_prod_id}','${buy_amount}','${buy_cost}')`;
//     console.log(sql2);
//     pool.query(sql2, async (err, results) => {
//       if (err) {
//         throw err;
//       }
//       console.log(results);
//       console.log("ID: ", full_prod_id);
//       res.send(results);
//     });
//     // console.log(req.body)
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// insert product to cart

app.post("/insertCart", (req, res) => {
    try {
      const { buy_id, full_prod_id, buy_amount, buy_cost } = req.body;
      const sql = `CALL insert_buy_detail('${buy_id}','${full_prod_id}','${buy_amount}','${buy_cost}')`;
      pool.query(sql, (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
        res.send(results);
      });
      // console.log(req.body)
    } catch (err) {
      console.error(err.message);
    }
  });

// insert customer (OK)
app.post("/insertCustomer", (req, res) => {
  try {
    const { cust_id, cust_name, cust_lname, phone_num, credit_card } = req.body;
    const sql = `INSERT INTO customer VALUES ('${cust_id}','${cust_name}','${cust_lname}', '${phone_num}','${credit_card}')`;

    console.log(sql);
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
    // console.log(req.body)
  } catch (err) {
    console.error(err.message);
  }
});

// --------------------------------------------
// Put Method
// UPDATE
// (OK)
// use get when working with browser and put(or get) with postman (?)
app.put("/updateCustomer/:id", (req, res) => {
  try {
    // let {cust_id} = req.params;  //undefined
    let { cust_id, cust_name, cust_lname, phone_num, credit_card } = req.body;

    // const sql = `UPDATE customer SET ('${cust_id}','${cust_name}','${cust_lname}', '${phone_num}','${credit_card}')`;

    // call store procedure
    const sql = `CALL update_customer('${cust_id}','${cust_name}','${cust_lname}', '${phone_num}','${credit_card}')`;
    pool.query(sql, (err, results) => {
      if (err) {
        res.send(err.message);
        throw err;
      }
      console.log(sql);
      console.log(cust_id);
      console.log(results);
      res.send("updated successfully");
    });
  } catch (err) {
    console.error(err.message);
  }
});
app.put("/updateBuy/:id", (req, res) => {
  try {
    let { id } = req.params;
    let { buy_date, buy_id, buy_status } = req.body;

    const sql = `CALL update_buy('${buy_id}','${buy_date}','${buy_status}')`;
    console.log(id);
    pool.query(sql, (err, results) => {
      if (err) {
        res.send(err.message);
        throw err;
      }
      console.log(sql);
      console.log(results);
      res.send("updated successfully");
    });
  } catch (err) {
    console.error(err.message);
  }
});

// --------------------------------------------
// Delete method (OK)
// Delete customer
app.delete("/deleteCustomer/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM customer where cust_id = "${id}"`;
    console.log(sql);
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// Delete buy
app.delete("/deleteBuy/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM buy where buy_id = "${id}"`;
    console.log(sql);
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// Delete Buy Detail
app.delete("/deleteBuydetail/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM buy_detail where full_prod_id = "${id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// Delete sale
app.delete("/deleteSale/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM sale where sale_id = "${id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// Delete product
app.delete("/deleteProduct/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM product where prod_id = "${id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// Delete product color
app.delete("/deleteProductcolor/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM prod_color where prod_color_id = "${id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
// Delete warehouse
app.delete("/deleteWarehouse/:id", (req, res) => {
  try {
    let { id } = req.params;

    const sql = `DELETE FROM warehouse where full_prod_id = "${id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});
