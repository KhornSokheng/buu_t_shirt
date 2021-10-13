DELIMITER //
CREATE OR REPLACE PROCEDURE insert_buy_detail( 
    IN buy_id_in varchar(5),
    -- IN item int(11), 
    -- IN full_prod_id varchar(11),
    IN _prod_name varchar(100),
    IN _color varchar(15),
    IN _size varchar(5),
    IN buy_amount int(11),
    IN buy_cost double(10,2) ) 

BEGIN

    DECLARE pre_item_num int(11);
    DECLARE next_item_num int(11) DEFAULT 1;
    DECLARE find_full_prod_id varchar(11);

    BEGIN

        -- Find the previous item number from the same buy_id
        SELECT MAX(item) INTO pre_item_num
        FROM buy_detail 
        WHERE buy_id = buy_id_in;


        -- check pre_item_num
        IF pre_item_num > 0 THEN
            SET next_item_num := pre_item_num + 1;
        END IF;
        -- Find the full_prod_id using name-color-size
        SELECT full_prod_id INTO find_full_prod_id
        FROM warehouse_view 
        WHERE prod_name = _prod_name
        AND color = _color
        AND size = _size;

        INSERT INTO buy_detail (buy_id,item,full_prod_id,buy_amount,buy_cost)
        VALUES (buy_id_in,next_item_num,find_full_prod_id,buy_amount,buy_cost) ;

    END;

END //

DELIMITER ;
