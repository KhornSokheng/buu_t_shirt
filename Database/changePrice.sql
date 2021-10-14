
update warehouse SET prod_cost = 195, prod_price=2*prod_cost
WHERE prod_id="P001";

update warehouse SET prod_cost = 295, prod_price=2*prod_cost
WHERE prod_id="P002";

update buy_detail SET buy_cost = 295
WHERE full_prod_id LIKE "P002%";

update buy_detail SET buy_cost = 195
WHERE full_prod_id LIKE "P001%";

update buy_detail SET buy_cost = 95
WHERE full_prod_id LIKE "P003%";

update sale_detail SET sale_cost = 295, sale_price=2*sale_cost
WHERE full_prod_id LIKE "P002%";

update sale_detail SET sale_cost = 195, sale_price=2*sale_cost
WHERE full_prod_id LIKE "P001%";

update sale_detail SET sale_cost = 95, sale_price=2*sale_cost
WHERE full_prod_id LIKE "P003%";