DELIMITER //
CREATE OR REPLACE TRIGGER update_warehouse_when_delete_sale_detail
BEFORE DELETE ON sale_detail FOR EACH ROW

BEGIN
    DECLARE _full_prod_id varchar(11);
    DECLARE _sale_amount int(11);

    BEGIN
        -- find full_prod_id from table sale_detail 
            SELECT full_prod_id,sale_amount INTO _full_prod_id, _sale_amount
            FROM sale_detail
            WHERE sale_detail.sale_id = OLD.sale_id and item=OLD.item;


            UPDATE warehouse
            SET warehouse.sold_amount = warehouse.sold_amount - _sale_amount
            WHERE warehouse.full_prod_id = _full_prod_id;

    END;
END //
DELIMITER ;