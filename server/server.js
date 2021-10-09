const express = require('express');
const mysql = require('mysql');
const app = express();
const port = '5000';
const pool = require('./connect_db');
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(port, ()=>{
    console.log(`server started on port ${port}...`);
}) 

// Routes
// get all products in warehouse (OK)
app.get('/getWarehouse', (req, res) =>{

    try {

        const sql = "SELECT * from warehouse";
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
        });
       


    } catch (err) {
        console.error(err.message);
    }
})

// get products with id in warehouse (OK)
app.get('/getWarehouse/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `SELECT * from warehouse where full_prod_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results);
        });

    } catch (err) {
        console.error(err.message);
    }
})

// get all products in warehouse view (OK)
app.get('/getWarehouseView', async (req, res) =>{

    try {

        const sql = "SELECT * from warehouse_view";
        await pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
        });
       


    } catch (err) {
        console.error(err.message);
    }
})

// get all customers (OK)
app.get('/getCustomer', (req, res) =>{

    try {

        // let {id} = req.params;

        const sql = `SELECT * from customer`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all size (OK)
app.get('/getSizeChart', (req, res) =>{

    try {

        const sql = `SELECT * from size_chart`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all buy (OK)
app.get('/getBuy', (req, res) =>{

    try {

        const sql = `SELECT * from buy`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all buy detail (OK)
app.get('/getBuydetail', (req, res) =>{

    try {

        const sql = `SELECT BD.buy_id,BD.item,BD.full_prod_id,BD.buy_amount,BD.buy_cost,WV.prod_name,WV.color,WV.size FROM buy_detail BD
        JOIN warehouse_view WV
        ON BD.full_prod_id = WV.full_prod_id ORDER BY buy_id, item;`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all sale (OK)
app.get('/getSale', (req, res) =>{

    try {

        const sql = `SELECT * from sale`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all sale detail (OK)
app.get('/getSaledetail', (req, res) =>{

    try {

        const sql = `SELECT * from sale_detail`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all product (OK)
app.get('/getProduct', (req, res) =>{

    try {

        const sql = `SELECT * from product`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// get all product color (OK)
app.get('/getProductcolor', (req, res) =>{

    try {

        const sql = `SELECT * from prod_color`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})


// --------------------------------------------
// post method
// insert buy
app.post('/insertBuy', (req,res)=>{
    try {
        const {buy_id, buy_date, buy_status} = req.body;
        const sql = `INSERT INTO buy(buy_id,buy_date,  buy_status) VALUES ('${buy_id}','${buy_date}','${buy_status}')`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });
        // console.log(req.body)
        
    } catch (err) {
        console.error(err.message);
    }
})

// insert buy detail
// trigger will be called to update product in warehouse
app.post('/insertBuyDetail', (req,res)=>{
    try {
        const {buy_id, full_prod_id, buy_amount,buy_cost} = req.body;
        const sql = `CALL insert_buy_detail('${buy_id}','${full_prod_id}','${buy_amount}','${buy_cost}')`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });
        // console.log(req.body)
        
    } catch (err) {
        console.error(err.message);
    }
})

// insert customer (OK)
app.post('/insertCustomer', (req,res)=>{
    try {
        const {cust_id,cust_name,cust_lname, phone_num,credit_card} = req.body;
        const sql = `INSERT INTO customer VALUES ('${cust_id}','${cust_name}','${cust_lname}', '${phone_num}','${credit_card}')`;
        
        console.log(sql)
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });
        // console.log(req.body)
        
    } catch (err) {
        console.error(err.message);
    }
})


// --------------------------------------------
// Put Method
// UPDATE
// (OK)
// use get when working with browser and put(or get) with postman (?)
app.put('/updateCustomer/:id', (req,res) => {
    try {
        let {id} = req.params;
        let {cust_id,cust_name,cust_lname, phone_num,credit_card} = req.body;
        
        // const sql = `UPDATE customer SET ('${cust_id}','${cust_name}','${cust_lname}', '${phone_num}','${credit_card}')`;

        // call store procedure
        const sql = `CALL update_customer('${cust_id}','${cust_name}','${cust_lname}', '${phone_num}','${credit_card}')`
        pool.query(sql, (err,results)=>{
            if(err){
                res.send(err.message);
                throw err;
            }
            console.log(sql);
            console.log(results);
            res.send("updated successfully")
            
        });
       

    } catch (err) {
        
        console.error(err.message);
    }
})




// --------------------------------------------
// Delete method (OK)
// Delete customer 
app.delete('/deleteCustomer/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `DELETE FROM customer where cust_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// Delete buy
app.delete('/deleteBuy/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `DELETE FROM buy where buy_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// Delete sale
app.delete('/deleteSale/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `DELETE FROM sale where sale_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// Delete product
app.delete('/deleteProduct/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `DELETE FROM product where prod_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// Delete product color
app.delete('/deleteProductcolor/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `DELETE FROM prod_color where prod_color_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})
// Delete warehouse
app.delete('/deleteWarehouse/:id', (req, res) =>{

    try {

        let {id} = req.params;

        const sql = `DELETE FROM warehouse where full_prod_id = "${id}"`;
        pool.query(sql, (err,results)=>{
            if(err){
                throw err;
            }
            console.log(results);
            res.send(results)
            
        });

    } catch (err) {
        console.error(err.message);
    }
})