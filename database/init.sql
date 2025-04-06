--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: status_enum; Type: TYPE; Schema: public; Owner: cse340admin
--

CREATE TYPE public.status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.status_enum OWNER TO cse340admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

-- Disable foreign key checks during initialization
SET session_replication_role = 'replica';





-- Create Repair Request Status Lookup Table
CREATE TABLE public.repair_request_status (
    status_id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL
);

-- Create Vehicle Category Table
CREATE TABLE public.vehicle_category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create Make Table
CREATE TABLE public.make (
    make_id SERIAL PRIMARY KEY,
    make VARCHAR(100) NOT NULL
);

-- Create User Table
CREATE TABLE public."user" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    permission INTEGER NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Model Table
CREATE TABLE public.model (
    model_id SERIAL PRIMARY KEY,
    make_id INTEGER NOT NULL REFERENCES public.make(make_id),
    category_id INTEGER REFERENCES public.vehicle_category(category_id) ON DELETE SET NULL,
    model VARCHAR(100) NOT NULL
);

-- Create Vehicle Table
CREATE TABLE public.vehicle (
    vehicle_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public."user"(user_id) ON DELETE SET NULL,
    model_id INTEGER NOT NULL REFERENCES public.model(model_id),
    year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    "desc" TEXT,
    price NUMERIC NOT NULL,
    is_featured BOOLEAN NOT NULL,
    is_sold BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Vehicle Image Table
CREATE TABLE public.vehicle_image (
    image_id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES public.vehicle(vehicle_id) ON DELETE CASCADE,
    image_path VARCHAR(255) NOT NULL
);

-- Create Review Table
CREATE TABLE public.review (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public."user"(user_id) ON DELETE CASCADE,
    vehicle_id INTEGER NOT NULL REFERENCES public.vehicle(vehicle_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Inquiry Table
CREATE TABLE public.inquiry (
    inquiry_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public."user"(user_id) ON DELETE CASCADE,
    vehicle_id INTEGER NOT NULL REFERENCES public.vehicle(vehicle_id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    responded BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Repair Request Table
CREATE TABLE public.repair_request (
    request_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public."user"(user_id) ON DELETE SET NULL,
    vehicle_id INTEGER NOT NULL REFERENCES public.vehicle(vehicle_id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    "desc" TEXT NOT NULL,
    status_id INTEGER NOT NULL REFERENCES public.repair_request_status(status_id) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Populate Repair Request Status
INSERT INTO public.repair_request_status (status) VALUES 
('Pending'),
('In Progress'),
('Completed'),
('Cancelled');

-- Populate Vehicle Categories
INSERT INTO public.vehicle_category (name) VALUES 
('Sports Car'),
('Luxury Vehicle'),
('Classic Car'),
('Utility Vehicle'),
('Concept Car'),
('Emergency Vehicle'),
('Novelty Vehicle');

-- Populate Makes
INSERT INTO public.make (make) VALUES 
('Lamborghini'),
('Custom'),
('Chevrolet'),
('Ford'),
('Dodge'),
('Tesla'),
('Cadillac');

-- Populate Models
INSERT INTO public.model (make_id, category_id, model) VALUES 
(1, 1, 'Aventador'),  -- Lamborghini Sports Car
(2, 5, 'Aerocar'),    -- Custom Concept Car
(2, 5, 'Batmobile'),  -- Custom Concept Car
(3, 1, 'Camaro'),     -- Chevrolet Sports Car
(4, 2, 'Crown Victoria'), -- Ford Luxury Vehicle
(2, 5, 'DeLorean'),   -- Custom Concept Car
(2, 6, 'Fire Truck'), -- Custom Emergency Vehicle
(6, 2, 'Escalade'),   -- Cadillac Luxury Vehicle
(2, 4, 'Hummer'),     -- Custom Utility Vehicle
(2, 3, 'Model T'),    -- Custom Classic Car
(2, 4, 'Monster Truck'), -- Custom Utility Vehicle
(2, 5, 'Mystery Van'),   -- Custom Concept Car
(2, 4, 'Survan'),     -- Custom Utility Vehicle
(5, 4, 'Wrangler');   -- Dodge Utility Vehicle

-- Populate Users
INSERT INTO public."user" (username, email, password_hash, permission, first_name, last_name) VALUES 
('johndoe', 'john.doe@example.com', '$2b$10$randomhashhere', 1, 'John', 'Doe'),
('janedoe', 'jane.doe@example.com', '$2b$10$anotherhashhere', 2, 'Jane', 'Doe'),
('admin123', 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$sGJCsB84+LsoffOXKHLElg$81FOP7QAB9jx7TnMayq2l+25fanlk0ESkH30djU6BMg', 3, 'Admin', 'Of Power'),
('test', 'test@example.com', '$argon2id$v=19$m=65536,t=3,p=4$xwHi1sng/Ebzw7hWFBUT1w$YdMaWUIwUoYInK/R36XH9L1CeEirlbEdwoi1T0cWDR4', 1, 'test', 'test');

-- Populate Vehicles
INSERT INTO public.vehicle (user_id, model_id, year, mileage, "desc", price, is_featured, is_sold) VALUES 
(1, 1, 2020, 24000, 'Sleek Lamborghini Aventador in pristine condition', 450000.00, true, false),
(1, 2, 1949, 26540, 'Unique flying car concept', 250000.00, false, false),
(2, 3, 1989, 11111, 'Iconic Batmobile replica', 750000.00, true, false),
(1, 4, 2019, 80000, 'Powerful Chevy Camaro SS', 45000.00, false, false),
(2, 5, 2011, 120000, 'Classic Police Interceptor', 15000.00, false, false),
(1, 6, 1985, 30000, 'Time-traveling DeLorean', 125000.00, true, false),
(2, 7, 2005, 65000, 'Fully equipped Fire Truck', 85000.00, false, false),
(1, 8, 2022, 10000, 'Luxurious Cadillac Escalade', 85000.00, true, false),
(2, 9, 2007, 34500, 'Rugged Military Hummer', 65000.00, false, false),
(1, 10, 1927, 204000, 'Vintage Ford Model T', 35000.00, false, false),
(2, 11, 2010, 40000, 'Massive Monster Truck', 95000.00, true, false),
(1, 12, 1970, 546060, 'Mystery solving van', 45000.00, false, false),
(2, 13, 2015, 156000, 'Custom Surfer Van', 35000.00, false, false),
(4, 14, 2019, 95000, 'Robust Jeep Wrangler', 42000.00, false, true);

-- Populate Vehicle Images
INSERT INTO public.vehicle_image (vehicle_id, image_path) VALUES 
(1, '/images/vehicles/adventador.jpg'),
(1, '/images/vehicles/adventador-tn.jpg'),
(2, '/images/vehicles/aerocar.jpg'),
(2, '/images/vehicles/aerocar-tn.jpg'),
(3, '/images/vehicles/batmobile.jpg'),
(3, '/images/vehicles/batmobile-tn.jpg'),
(4, '/images/vehicles/camaro.jpg'),
(4, '/images/vehicles/camaro-tn.jpg'),
(5, '/images/vehicles/crwn-vic.jpg'),
(5, '/images/vehicles/crwn-vic-tn.jpg'),
(6, '/images/vehicles/delorean.jpg'),
(6, '/images/vehicles/delorean-tn.jpg'),
(7, '/images/vehicles/fire-truck.jpg'),
(7, '/images/vehicles/fire-truck-tn.jpg'),
(8, '/images/vehicles/escalade.jpg'),
(8, '/images/vehicles/escalade-tn.jpg'),
(9, '/images/vehicles/hummer.jpg'),
(9, '/images/vehicles/hummer-tn.jpg'),
(10, '/images/vehicles/model-t.jpg'),
(10, '/images/vehicles/model-t-tn.jpg'),
(11, '/images/vehicles/monster-truck.jpg'),
(11, '/images/vehicles/monster-truck-tn.jpg'),
(12, '/images/vehicles/mystery-van.jpg'),
(12, '/images/vehicles/mystery-van-tn.jpg'),
(13, '/images/vehicles/survan.jpg'),
(13, '/images/vehicles/survan-tn.jpg'),
(14, '/images/vehicles/wrangler.jpg'),
(14, '/images/vehicles/wrangler-tn.jpg');

-- Populate Reviews
INSERT INTO public.review (user_id, vehicle_id, message) VALUES 
(1, 3, 'This Batmobile is an absolute dream! Looks just like the movies.'),
(2, 1, 'Incredible Lamborghini, performance is out of this world.'),
(1, 6, 'Great conversation piece, definitely turns heads everywhere.'),
(2, 11, 'Monster truck is massive and incredibly fun!');

-- Populate Inquiries
INSERT INTO public.inquiry (user_id, vehicle_id, subject, message) VALUES 
(2, 1, 'Interested in Aventador', 'Would love to know more about this car''s history and condition.'),
(1, 3, 'Batmobile Details', 'Can you provide more information about this unique vehicle?');

-- Populate Repair Requests
INSERT INTO public.repair_request (user_id, vehicle_id, subject, "desc", status_id) VALUES 
(1, 6, 'DeLorean Flux Capacitor Check', 'Need to verify time travel mechanism is functioning correctly', 1),
(2, 11, 'Monster Truck Suspension', 'Requires full suspension system inspection', 2);

-- Re-enable foreign key checks
SET session_replication_role = 'origin';

--
-- PostgreSQL database dump complete
--