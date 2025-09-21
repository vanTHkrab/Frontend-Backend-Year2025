/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    // await knex('table_name').del()
    //   table.uuid('id').unique().primary();
    //   table.string('title', 255).notNullable();
    //   table.text('message').notNullable();
    //   table.string('priority').notNullable();
    //   table.json('tags').notNullable();
    await knex('notifications').insert([{
        title: 'System Update',
        message: 'The system will be down for maintenance at midnight.',
        priority: 'high',
        tags: JSON.stringify(['system', 'maintenance'])
    }, {
        title: 'New Feature',
        message: 'We have added a new feature to enhance your experience.',
        priority: 'medium',
        tags: JSON.stringify(['feature', 'update'])
    }, {
        title: 'Weekly Newsletter',
        message: 'Check out our latest news and updates in this week\'s newsletter.',
        priority: 'low',
        tags: JSON.stringify(['newsletter', 'weekly'])
    }, {
        title: 'Security Alert',
        message: 'Please update your password to ensure your account remains secure.',
        priority: 'high',
        tags: JSON.stringify(['security', 'alert'])
    }, {
        title: 'Event Invitation',
        message: 'You are invited to our upcoming event. RSVP now!',
        priority: 'medium',
        tags: JSON.stringify(['event', 'invitation'])
    }, {
        title: 'Survey Request',
        message: 'We value your feedback. Please take a moment to complete our survey.',
        priority: 'low',
        tags: JSON.stringify(['survey', 'feedback'])
    }, {
        title: 'Account Notice',
        message: 'Your account will expire in 7 days. Please renew to continue using our services.',
        priority: 'high',
        tags: JSON.stringify(['account', 'notice'])
    },]);
};
