DELIMITER //
CREATE OR REPLACE PROCEDURE update_buy(
    IN _buy_id varchar(5),
    IN _buy_date date,
    IN _buy_status varchar(30)) 
BEGIN

    UPDATE buy
    SET buy_date = _buy_date, buy_status = _buy_status
    WHERE buy_id = _buy_id;

END //

DELIMITER ;

--  CALL update_buy('B0005', '2021-10-23','completed')