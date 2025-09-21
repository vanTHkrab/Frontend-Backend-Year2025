/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('notifications', (table) => {
        table.uuid('id').unique().primary().defaultTo(knex.raw('(UUID())'));
        table.string('title', 255).notNullable();
        table.text('message').notNullable();
        table.string('priority').notNullable();
        table.json('tags').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.index('id');
        table.index('title');
        table.index('priority');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('notifications');
};
