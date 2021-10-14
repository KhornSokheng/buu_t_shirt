DELIMITER //
CREATE OR REPLACE PROCEDURE insert_cart( 
    IN _sale_id varchar(6),
    IN _cust_id varchar(5),
    IN _prod_id varchar(5),
    IN _color varchar(15),
    IN _size varchar(5),
    IN _sale_amount int(11))
    -- IN _sale_price double(10,2) ) 

BEGIN

    DECLARE pre_item_num int(11);
    DECLARE next_item_num int(11) DEFAULT 1;
    DECLARE find_full_prod_id varchar(11);
    DECLARE is_id_exist varchar(6);
    DECLARE _sale_cost double(10,2);
    DECLARE _sale_price double(10,2);

    BEGIN

        
        -- check if sale_id already exist with sale_status=cart
        SET is_id_exist = (SELECT sale_id FROM sale WHERE sale_id = _sale_id);
        -- SELECT sale_id
        -- FROM sale
        -- WHERE sale_id = _sale_id;
        -- );
        

        IF is_id_exist IS NULL THEN
            -- create new sale_id
            INSERT INTO sale (sale_id, sale_date, cust_id, sale_status)
            VALUES (_sale_id,CURRENT_DATE(),_cust_id,"cart");
        END IF;

        -- Find the previous item number from the same sale_id
        SELECT MAX(item) INTO pre_item_num
        FROM sale_detail 
        WHERE sale_id = _sale_id;

        -- check pre_item_num
        IF pre_item_num > 0 THEN
            SET next_item_num := pre_item_num + 1;
        END IF;

        -- Find the full_prod_id using name-color-size
        SELECT full_prod_id, prod_cost, prod_price INTO find_full_prod_id, _sale_cost,_sale_price
        FROM warehouse_view 
        WHERE prod_id = _prod_id
        AND color = _color
        AND size = _size;

        INSERT INTO sale_detail (sale_id,item,full_prod_id,sale_amount,sale_cost,sale_price)
        VALUES (_sale_id,next_item_num,find_full_prod_id,_sale_amount,_sale_cost,_sale_price) ;

    END;

END //

DELIMITER ;
-- CALL insert_cart("S99999","C9999","P001","Black","L",2)