
CREATE TABLE coffee_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  color VARCHAR(7) NOT NULL
);

INSERT INTO coffee_types (name, color) VALUES
('Robusta', '#3A383D'),
('Arabic', '#77A9B0');

CREATE TABLE coffee (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  coffee_type_id INT REFERENCES coffee_types(id),
  price NUMERIC(10,2) NOT NULL
);

INSERT INTO coffee (title, description, image_url, coffee_type_id, price)
VALUES
  ('Dark Roast', 'Free in the MVST office', '/darkRoast.png', (SELECT id FROM coffee_types WHERE name='Arabic'), 19.00),
  ('Americano', 'Free in the MVST office', '/americano.png', (SELECT id FROM coffee_types WHERE name='Robusta'), 20.00),
  ('Cappucino', 'Free in the MVST office', '/cappucino.png', (SELECT id FROM coffee_types WHERE name='Arabic'), 15.00),
  ('Decaf Americano', 'Free in the MVST office', '/decafAmericano.png', (SELECT id FROM coffee_types WHERE name='Robusta'), 20.00),
  ('Pine Roast', 'Free in the MVST office', '/pineRoast.png', (SELECT id FROM coffee_types WHERE name='Arabic'), 19.00),
  ('Raphael Original', 'Free in the MVST office', '/raphaelOriginal.png', (SELECT id FROM coffee_types WHERE name='Arabic'), 15.00);

CREATE TABLE general_info (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content JSONB
);

INSERT INTO general_info (title, content)
VALUES (
  'MVST Coffee Page',
  '{
    "header": {
      "logo_url": "/logo.png",
      "create_button": "Create"
    },
    "coffee_page": {
      "title": "Roasted Coffee",
      "description": "Choose a coffee from below or create your own.",
      "create_button": "Create your own coffee",
      "background_image_url": "/header_image.png",
      "cards_title": "MVST. Exclusive Coffee"
    },
    "footer": {
      "background_image_url": "/footer_image.png"
    }
  }'::jsonb
);

CREATE TABLE modals (
  id SERIAL PRIMARY KEY,
  modal_key VARCHAR(100) NOT NULL,
  title VARCHAR(100),
  fields JSONB,
  cancel_button VARCHAR(100),
  confirm_button VARCHAR(100),
  background_image VARCHAR(255)
);

INSERT INTO modals (
  modal_key,
  title,
  fields,
  cancel_button,
  confirm_button,
  background_image
)
VALUES (
  'new_coffee',
  'Create New',
  '{
    "name": { "label": "Name", "placeholder": "Name your coffee here", "type": "text" },
    "price": { "label": "Price", "placeholder": "0.00", "type": "price" },
    "type": { "label": "Type", "options": ["Arabic", "Robusta"], "type": "options" },
    "image": { "label": "Upload image", "placeholder": "Post image url here", "type": "text" },
    "description": { "label": "Description", "placeholder": "Add a description...", "type": "text" }
  }'::jsonb,
  'Discard',
  'Confirm',
  '/new_coffee_image.png'
);