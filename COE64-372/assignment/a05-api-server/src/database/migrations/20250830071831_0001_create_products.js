/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.string('category').defaultTo('');
        table.text('description').defaultTo('');
        table.string('imageUrl').defaultTo('');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products');
};
