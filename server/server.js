const express = require("express");
const mysql = require("mysql");
const app = express();
const port = "5000";
const pool = require("./connect_db");
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


// app.use(cors());

app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

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
    const { prod_id, color, prod_color_id } = req.body;
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

app.get("/getColor", (req, res) => {
  try {
    const sql = `SELECT color from prod_color`;
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
app.get("/getSize", (req, res) => {
  try {
    const sql = `SELECT size from size_chart`;
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
app.get("/getBuyID", (req, res) => {
  try {
    const sql = `SELECT buy_id FROM buy`;
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

// get all buy (OK)
app.get("/getBuy/:id", (req, res) => {
  try {
    const buy_id = req.params.id;
    const sql = `SELECT DATE_FORMAT(buy_date, "%W %e %M %Y") AS buy_date, buy_id, buy_status FROM buy where buy_id like "%`+`${buy_id}%" 
      ORDER BY buy_id DESC`;
    console.log (sql)
    console.log (buy_id)
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
        ON BD.full_prod_id = WV.full_prod_id  ORDER BY buy_id DESC, item;`;
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
      `${id}%" ORDER BY buy_id, item;`;
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
app.get("/getSale/:id", (req, res) => {

  const  sale_id  = req.params.id;

  try {
    const sql = `SELECT DATE_FORMAT(sale_date, "%W %e %M %Y") AS sale_date,
    sale_id,cust_id,receiver_name,receiver_phone,sale_status,delivery_id,
    delivery_price,DATE_FORMAT(delivery_begin_date, "%W %e %M %Y") AS delivery_begin_date,
    DATE_FORMAT(delivery_receive_date, "%W %e %M %Y") AS delivery_receive_date,address,
    delivery_status FROM sale WHERE sale_id like "%`+`${sale_id}%" ORDER BY sale_id DESC`;
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
app.get("/getSaledetail/:id", (req, res) => {
  const  sale_id  = req.params.id;
  try {
    const sql = `SELECT * from sale_detail WHERE sale_id like "%`+`${sale_id}%" ORDER BY sale_id DESC, item ASC`;
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
app.get("/getProduct/:id", (req, res) => {
  try {
    const prod_color_id = req.params.id;
    // const color = req.params.color;
    // const sql = `SELECT * from warehouse_view where prod_color_id = "${id}" GROUP BY prod_color_id`;
    // const sql = `SELECT * from warehouse_view where prod_id = "${id}" and color="${color}"  GROUP BY color LIMIT 1`;
    const sql = `SELECT * from warehouse_view where prod_color_id = "${prod_color_id}" GROUP BY color LIMIT 1;`;
    console.log(sql);
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
});

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
app.get("/getCostTotal/:id", (req, res) => {
  try {
    const buy_id = req.params.id;
    const sql = `SELECT sum(buy_cost)total FROM buy_detail where buy_id LIKE "%${buy_id}%";`;
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
app.get("/getSalecost/:id", (req, res) => {
  try {
    const sale_id = req.params.id;
    const sql = `SELECT SUM(sale_cost)cost FROM sale_detail where sale_id LIKE "%${sale_id}%";`;
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
app.get("/getSaleprice/:id", (req, res) => {
  try {
    const sale_id = req.params.id;
    const sql = `SELECT SUM(sale_price)price FROM sale_detail where sale_id LIKE "%${sale_id}%";`;
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

// get product in cart of cust_id
app.get("/getCartList/:email", (req, res) => {
  try {
    // const cust_id = req.params.id;
    const email = req.params.email;

    const sql = `SELECT sale.sale_id,customer.cust_id,email,sale_date, sale_detail.full_prod_id,item,
                sale_amount, sale_price, image_url,prod_name,color,size,prod_color_id
                FROM sale JOIN sale_detail
                ON sale.sale_id = sale_detail.sale_id
                JOIN warehouse_view
                ON sale_detail.full_prod_id = warehouse_view.full_prod_id
                JOIN customer ON customer.cust_id=sale.cust_id
                WHERE sale_status = "cart"
                AND email = "${email}"`;
                // AND cust_id = "${cust_id}"`;
    console.log(sql);
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
    const { buy_id, prod_name, color, size, buy_amount, buy_cost } = req.body;

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
// app.post('/register2',(req,res)=>{

//   const password = req.body.password;
//   const firstname = req.body.cust_name;
//   const lastname = req.body.cust_lname;
//   const phone = req.body.phone_num;
//   const creditcard = req.body.credit_card;
//   const cust_id = `C${uuidv4()}`;
//   const email = req.body.email;

//   console.log(email,password);

//   pool.query("INSERT INTO customer (cust_id,email,password,cust_name,cust_lname,phone_num,credit_card) VALUES (?,?,?,?,?,?,?)",
//   [cust_id,email,password,firstname,lastname,phone,creditcard],
//   (err,result)=>{
//       if(err){
//       console.log("err1 :",err);
//       res.send(err);  
//       }
//       if(result){
//           console.log("chk1 :",result);
//           res.send(result);
//       }            

//   })

// })
app.post('/register3',(req,res)=>{

  const password = req.body.password;
  const firstname = req.body.cust_name;
  const lastname = req.body.cust_lname;
  const phone = req.body.phone_num;
  const creditcard = req.body.credit_card;
  const cust_id = `C${uuidv4()}`;
  const email = req.body.email;

  console.log(email,password);

  bcrypt.hash(password,saltRounds,(err,hash)=>{
      if(err){
          console.log("hash:",err);
      }
      pool.query("INSERT INTO customer (cust_id,email,password,cust_name,cust_lname,phone_num,credit_card) VALUES (?,?,?,?,?,?,?)",
      [cust_id,email,hash,firstname,lastname,phone,creditcard],
      (err,result)=>{
          if(err){
          console.log(err);
          res.send(err);  
          }
          if(result){
              console.log(result);
              res.send(result);
          }            
      })
  })

})
app.post('/login',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)

  pool.query("SELECT * FROM customer WHERE email=? and password=?",
  [email,password],
  (err,result)=>{
      if(err){
          console.log(err); 
          res.send({err:err});  
      }
      if(result.length>0){
          res.send(result);
      }else{
          res.send({message:"Wrong email/password.."});
      }
     
  })
})
app.post('/login2',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  pool.query("SELECT * FROM customer WHERE email=?;",
  [email],
  (err,result)=>{
      if(err){
          console.log(err);
          res.send({err:err});
      }
      console.log("login2:",result);
      if(result.length>0){
          bcrypt.compare(password,result[0].password,
              (error,response)=>{
                console.log("chk2 :",response)
                  if(response){
                      // req.session.user = result;
                      // console.log("session.user:",req.session.user);
                      res.send(result);
                  }else{
                      res.send({error:"Wrong email/password"});
                  }
              })

      }else{
          res.send({error:"email doesn't exist..."});
      }
     
  })
})

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
    const { sale_id, cust_id, prod_id, color, size, sale_amount } = req.body;
    const sql = `CALL insert_cart("${sale_id}","${cust_id}","${prod_id}", "${color}", "${size}", "${sale_amount}" )`;
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
app.put("/updateBuyDetail/:id", (req, res) => {
  try {
    let { id } = req.params;
    let { buy_id, item, buy_amount, buy_cost } = req.body;

    const sql = `UPDATE buy_detail SET buy_amount=${buy_amount},buy_cost=${buy_cost} WHERE buy_id="${buy_id} " AND item = ${item}`;
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
app.put("/updateSale/:id", (req, res) => {
  try {
    let { id } = req.params;
    let { sale_id,sale_status,delivery_price,delivery_begin_date,delivery_receive_date,delivery_status} = req.body;

    const sql = `UPDATE sale SET sale_id="${sale_id}",sale_status="${sale_status}",delivery_price=${delivery_price},
    delivery_begin_date="${delivery_begin_date}",delivery_receive_date="${delivery_receive_date}",delivery_status="${delivery_status}" 
    WHERE sale_id="${sale_id}"`;

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

// check out order
// change sale_status from "cart" to "new"
app.put("/checkOut/:id", (req, res) => {
  try {
    // let sale_id = req.params.id;
    let { sale_id,receiverName,receiverPhone,address }= req.body;

    const sql = `UPDATE sale SET receiver_name="${receiverName}",receiver_phone="${receiverPhone}", sale_status="new_order", address="${address}"
      WHERE sale_id="${sale_id}"`;
    // console.log(id);
    pool.query(sql, (err, results) => {
      if (err) {
        res.send(err.message);
        throw err;
      }
      console.log(sql);
      console.log(results);
      res.send(`CheckOut Sale ID: ${sale_id} successfully...`);
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
