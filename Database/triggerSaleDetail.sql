DELIMITER //
DROP TRIGGER IF EXISTS update_warehouse_sale//
CREATE OR REPLACE TRIGGER update_warehouse_when_insert_sale_detail
AFTER INSERT ON sale_detail FOR EACH ROW

BEGIN
    DECLARE _sale_status varchar(10);

    BEGIN
        -- find sale_status from table sale 
        SELECT sale_status INTO _sale_status
        FROM sale
        WHERE sale.sale_id = NEW.sale_id;

        -- IF _sale_status = "completed" THEN 
        --     UPDATE warehouse
        --     SET warehouse.sold_amount = warehouse.sold_amount + NEW.sale_amount
        --     WHERE warehouse.full_prod_id = NEW.full_prod_id;
        -- END IF;
        IF _sale_status = "cart" THEN 
            UPDATE warehouse
            SET warehouse.sold_amount = warehouse.sold_amount + NEW.sale_amount
            WHERE warehouse.full_prod_id = NEW.full_prod_id;
        END IF;
    END;
END //
DELIMITER ;