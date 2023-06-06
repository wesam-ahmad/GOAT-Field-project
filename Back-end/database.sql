
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL, 
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  deleted boolean DEFAULT false

);

CREATE TABLE pitch (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price NUMERIC,
  size VARCHAR(100),
  details TEXT,
  images BYTEA[],
  description TEXT,
  location TEXT,
  provider_id UUID,
  user_name VARCHAR(255),
  deleted BOOLEAN DEFAULT false,
  FOREIGN KEY (provider_id) REFERENCES users(user_id)
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  date VARCHAR,
  time VARCHAR,
  name VARCHAR,
  phone VARCHAR,
  user_id UUID REFERENCES users(user_id),
  pitch_id INTEGER REFERENCES pitch(id),
  deleted BOOLEAN DEFAULT false
);

-- ! This is from Mais, for payment info
CREATE TABLE payment (
    user_id UUID REFERENCES users(user_id),
    email VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    expiration_date VARCHAR(7) NOT NULL,
    security_code VARCHAR(255) NOT NULL,
    name_on_card VARCHAR(255) NOT NULL
);


