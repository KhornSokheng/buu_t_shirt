CREATE OR REPLACE VIEW warehouse_view AS
SELECT full_prod_id, prod_name, prod_color.color, size, total_amount,
sold_amount, prod_cost, prod_price, product.prod_id, prod_color.prod_color_id,image_url
FROM warehouse JOIN prod_color
ON warehouse.prod_color_id = prod_color.prod_color_id
JOIN product
ON prod_color.prod_id = product.prod_id