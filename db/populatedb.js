const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const buildtable = `CREATE TABLE products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    itemname VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    quantity INT DEFAULT 0,
    status VARCHAR(50)
);`;

const buildsectable = `CREATE TABLE allcategory(
    category VARCHAR(100));`;

const InsertData1 = `INSERT INTO allcategory (category) VALUES
('Streetwear'),
('Hoodies'),
('T-Shirts'),
('Sneakers'),
('Accessories'),
('Jackets');`;

const InsertData2 = `INSERT INTO products (itemname, description, category, price, quantity, status) VALUES
('Oversized Black Hoodie', 'Heavy cotton oversized streetwear hoodie with minimal logo', 'Hoodies', 59.99, 25, 'Available in stock'),

('Graffiti Print T-Shirt', 'Bold graffiti-style streetwear graphic tee', 'T-Shirts', 24.99, 50, 'Available in stock'),

('Retro High Sneakers', 'Vintage-inspired high-top sneakers for everyday street style', 'Sneakers', 89.99, 15, 'Out of stock'),

('Cargo Street Pants', 'Loose-fit cargo pants with multiple pockets', 'Streetwear', 49.99, 0, 'Out of stock'),

('Urban Windbreaker Jacket', 'Lightweight windbreaker with waterproof material', 'Jackets', 69.99, 20, 'Available in stock'),

('Minimal Logo Cap', 'Simple embroidered streetwear baseball cap', 'Accessories', 19.99, 100, 'Available in stock'),

('Distressed Denim Jacket', 'Washed and ripped denim street jacket', 'Jackets', 79.99, 12, 'Off sale');`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // 🔥 required for most cloud DBs
        },
    });
    await client.connect();
    await client.query(buildtable);
    await client.query(buildsectable);
    await client.query(InsertData1);
    await client.query(InsertData2);
    await client.end();
    console.log("done");
}

main();
