DELIMITER //
CREATE OR REPLACE PROCEDURE insert_customer(
    IN cust_id varchar(5),
    IN cust_name varchar(30),
    IN cust_lname varchar(30),
    IN phone_num varchar(10),
    IN credit_card varchar(16)) 
BEGIN

    INSERT INTO customer
    VALUES (cust_id,cust_name,cust_lname, phone_num,credit_card) ;

END //

DELIMITER ;

--  CALL insert_customer('C9990','Just Me', 'Sokheng', '095-124247','4568 6523 4587 5')