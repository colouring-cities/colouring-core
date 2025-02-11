


-- Create field_types table
CREATE TABLE IF NOT EXISTS public.field_types (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);



-- Create main_categories table
CREATE TABLE IF NOT EXISTS public.main_categories (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    color VARCHAR(10),
    description VARCHAR(500),
    "order" INTEGER
);



-- Create subcategories table
CREATE TABLE IF NOT EXISTS public.subcategories (
    id SERIAL PRIMARY KEY,
    main_category_id INTEGER NOT NULL REFERENCES public.main_categories ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    "order" INTEGER,
    underdevelopment BOOLEAN DEFAULT FALSE,
    parent_id INTEGER
);



-- Create subcategory_fields table
CREATE TABLE IF NOT EXISTS public.subcategory_fields1 (
    id SERIAL PRIMARY KEY,
    subcategory_id INTEGER NOT NULL REFERENCES public.subcategories ON DELETE CASCADE,
    parent_id INTEGER REFERENCES public.subcategory_fields ON DELETE SET NULL,
    field_type_id INTEGER NOT NULL REFERENCES public.field_types ON DELETE RESTRICT,
    label VARCHAR(255) NOT NULL,
    options VARCHAR(255),
    hint VARCHAR(255),
    type VARCHAR(50),
    "order" INTEGER
);

-- Create visualization_subcategories table
CREATE TABLE visualization_subcategories (
    id INT PRIMARY KEY,
    main_category_id INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    FOREIGN KEY (main_category_id) REFERENCES main_categories(id) ON DELETE CASCADE
);

-- Create visualization_subcategory_values table
CREATE TABLE visualization_subcategory_values (
    id INT PRIMARY KEY,
    visualization_subcategory_id INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    FOREIGN KEY (visualization_subcategory_id) REFERENCES visualization_subcategories(id) ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS visualization_subcategories (
    id INT PRIMARY KEY,
    main_category_id INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    FOREIGN KEY (main_category_id) REFERENCES main_categories(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS  visualization_subcategory_values (
    id INT PRIMARY KEY,
    visualization_subcategory_id INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    FOREIGN KEY (visualization_subcategory_id) REFERENCES visualization_subcategories(id) ON DELETE CASCADE
);



