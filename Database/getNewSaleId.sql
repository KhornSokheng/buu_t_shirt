-- function to get a new sale_id
-- Not work yet

DELIMITER //

CREATE FUNCTION getNewSaleId ( )
RETURNS VARCHAR

BEGIN

   DECLARE newId VARCHAR;
   DECLARE oldId VARCHAR;

    -- Find the largest sale_id from sale
    SELECT MAX(sale_id) INTO oldId
    FROM sale  
    

   SET newId = oldId;

   RETURN newId;

END; //

DELIMITER ;