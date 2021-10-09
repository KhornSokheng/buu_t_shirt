DELIMITER //
CREATE OR REPLACE PROCEDURE insert_sale_detail( IN sale_id varchar(6),
    IN item int,
    IN full_prod_id varchar(11),
    IN sale_amount varchar(5),
    IN sale_cost double(10,2),
    IN sale_price double(10,2)
    ) 
BEGIN

    INSERT INTO sale_detail
    VALUES (sale_id, item, full_prod_id, sale_amount, sale_cost, sale_price) ;
    
END //

DELIMITER ;
-- CALL insert_sale_detail('S00013', 1, 'P001-DO-S', 3, 195.00, 390.00)

