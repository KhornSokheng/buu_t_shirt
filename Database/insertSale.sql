DELIMITER //
CREATE OR REPLACE PROCEDURE insert_sale( IN sale_id varchar(6),
    IN sale_date date,
    IN cust_id varchar(5),
    IN receiver_name varchar(60),
    IN receiver_phone varchar(11),
    IN sale_status varchar(10),
    IN delivery_id varchar(6),
    IN delivery_price double(5,2),
    IN delivery_begin_date date,
    IN delivery_receive_date date,
    IN address varchar(100),
    IN delivery_status varchar(15) ) 
BEGIN

    INSERT INTO sale (sale_id, sale_date, cust_id, receiver_name, receiver_phone, sale_status, delivery_id, delivery_price, delivery_begin_date, delivery_receive_date, address, delivery_status)
    VALUES (sale_id, sale_date, cust_id, receiver_name, receiver_phone, sale_status, delivery_id, delivery_price, delivery_begin_date, delivery_receive_date, address, delivery_status) ;
    
END //

DELIMITER ;
-- CALL insert_sale('S00013', '2021-07-05', 'C0001', 'อนันดา เนาว์แก้งใหม่', '096-8640235', 'completed', 'd00001', 30.00, '2021-07-05', '2021-07-07', 'มหาวิทยาลัยบูรพา วิทยาเขตจันทบุรี', 'delivering')

