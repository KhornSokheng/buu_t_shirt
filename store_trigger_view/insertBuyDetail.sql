DELIMITER //
CREATE OR REPLACE PROCEDURE insert_buy_detail( IN buy_id_in varchar(5),
    -- IN item int(11), 
    IN full_prod_id varchar(11),
    IN buy_amount int(11),
    IN buy_cost double(10,2) ) 

BEGIN

    DECLARE pre_item_num int(11);
    DECLARE next_item_num int(11) DEFAULT 1;

    BEGIN

        -- Find the previous item number from the same buy_id
        SELECT MAX(item) INTO pre_item_num
        FROM buy_detail 
        WHERE buy_id = buy_id_in;


        -- check pre_item_num
        IF pre_item_num > 0 THEN
            SET next_item_num := pre_item_num + 1;
        END IF;

        INSERT INTO buy_detail (buy_id,item,full_prod_id,buy_amount,buy_cost)
        VALUES (buy_id_in,next_item_num,full_prod_id,buy_amount,buy_cost) ;

    END;

END //

DELIMITER ;
-- CALL insert_buy_detail('B0004', 'P001-BK-L', 3, 195.00)