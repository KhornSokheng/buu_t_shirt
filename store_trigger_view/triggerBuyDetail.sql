DELIMITER //
CREATE OR REPLACE TRIGGER update_warehouse_buy
AFTER INSERT ON buy_detail FOR EACH ROW

BEGIN
    
    UPDATE warehouse
    SET warehouse.total_amount = warehouse.total_amount + NEW.buy_amount,
    warehouse.prod_cost = NEW.buy_cost,
    warehouse.prod_price = NEW.buy_cost*2
    WHERE warehouse.full_prod_id = NEW.full_prod_id;

END //
DELIMITER ;