/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name', 150).notNullable();
        table.string('email', 191).notNullable().unique();
        table.string('password_hash').nullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users');
};
