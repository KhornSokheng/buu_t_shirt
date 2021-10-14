DELIMITER //
CREATE OR REPLACE PROCEDURE update_customer(
    IN _cust_id varchar(5),
    IN _cust_name varchar(30),
    IN _cust_lname varchar(30),
    IN _phone_num varchar(10),
    IN _credit_card varchar(16)) 
BEGIN

    UPDATE customer
    SET cust_name = _cust_name, cust_lname = _cust_lname, 
    phone_num = _phone_num, credit_card = _credit_card
    WHERE cust_id = _cust_id;

END //

DELIMITER ;

--  CALL update_customer('C9999','Just Me', 'Sokheng', '095-124247','4568 6523 4587 5')