/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    { id: 'prod-001', name: 'Wireless Mouse', price: 25, category: 'Electronics', description: 'A smooth and responsive wireless mouse.', imageUrl: 'https://example.com/images/mouse.jpg' },
    { id: 'prod-002', name: 'Bluetooth Headphones', price: 80, category: 'Electronics', description: 'Noise-cancelling over-ear headphones.', imageUrl: 'https://example.com/images/headphones.jpg' },
    { id: 'prod-003', name: 'Coffee Maker', price: 45, category: 'Home Appliances', description: 'Brew the perfect cup of coffee every morning.', imageUrl: 'https://example.com/images/coffeemaker.jpg' },
    { id: 'prod-004', name: 'Yoga Mat', price: 20, category: 'Fitness', description: 'Non-slip yoga mat for all types of exercises.', imageUrl: 'https://example.com/images/yogamat.jpg' },
    { id: 'prod-005', name: 'Smartwatch', price: 150, category: 'Electronics', description: 'Track your fitness and stay connected on the go.', imageUrl: 'https://example.com/images/smartwatch.jpg' },
    { id: 'prod-006', name: 'Electric Kettle', price: 30, category: 'Home Appliances', description: 'Boil water quickly and efficiently.', imageUrl: 'https://example.com/images/kettle.jpg' },
    { id: 'prod-007', name: 'Running Shoes', price: 60, category: 'Footwear', description: 'Comfortable and durable running shoes.', imageUrl: 'https://example.com/images/runningshoes.jpg' },
  ]);
};
