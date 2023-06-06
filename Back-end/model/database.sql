-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     user_id INT,
--     first_name VARCHAR(50),
--     last_name VARCHAR(50),
--     email VARCHAR(100),
--     password VARCHAR(50),
--     role VARCHAR(50)
-- );

-- ! This is from Mais, for payment info
CREATE TABLE payment (
    user_id UUID REFERENCES users(user_id),
    email VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    expiration_date VARCHAR(7) NOT NULL,
    security_code VARCHAR(255) NOT NULL,
    name_on_card VARCHAR(255) NOT NULL
);
