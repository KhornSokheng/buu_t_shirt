DELIMITER //

CREATE OR REPLACE TRIGGER update_warehouse_when_update_sale
AFTER UPDATE ON sale FOR EACH ROW

BEGIN
    -- DECLARE _full_prod_id varchar(11);
    -- DECLARE _sale_amount int(11);

    BEGIN
        

        IF NEW.sale_status = "cancel" THEN 
            --  if cancel, we delete from sale_detail
            DELETE FROM sale_detail WHERE sale_detail.sale_id = NEW.sale_id;

            -- find full_prod_id from table sale_detail 
            -- SELECT full_prod_id,sale_amount INTO _full_prod_id, _sale_amount
            -- FROM sale_detail
            -- WHERE sale_detail.sale_id = NEW.sale_id;


            -- UPDATE warehouse
            -- SET warehouse.sold_amount = warehouse.sold_amount + _sale_amount
            -- WHERE warehouse.full_prod_id = _full_prod_id;

            

        END IF;
    END;
END //
DELIMITER ;