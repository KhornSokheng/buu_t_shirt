DELIMITER //
CREATE OR REPLACE PROCEDURE insert_buy( IN buy_date date,
    IN buy_id varchar(5),
    IN buy_status varchar(10) ) 
BEGIN

    INSERT INTO buy (buy_id,buy_date,buy_status)
    VALUES (buy_id,buy_date,buy_status) ;

END //

DELIMITER ;

--  CALL insert_buy('2021-07-23', 'B0004', 'completed')