/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('refresh_tokens', (table) => {
        table.bigIncrements('id').primary();
        table.integer('user_id').unsigned().notNullable()
            .references('id').inTable('users')
            .onDelete('CASCADE');
        table.string('jti', 36).notNullable().unique();
        table.boolean('revoked').notNullable().defaultTo(false);
        table.string('replaced_by_jti', 36).nullable();
        table.dateTime('expires_at').notNullable();
        table.timestamps(true, true);

    });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('refresh_tokens');
};
