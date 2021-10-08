DELIMITER //
CREATE OR REPLACE TRIGGER update_warehouse_sale
AFTER INSERT ON sale_detail FOR EACH ROW

BEGIN
    
    UPDATE warehouse
    SET warehouse.sold_amount = warehouse.sold_amount + NEW.sale_amount
    WHERE warehouse.full_prod_id = NEW.full_prod_id;

END //
DELIMITER ;