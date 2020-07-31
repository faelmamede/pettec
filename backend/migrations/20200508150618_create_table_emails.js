
exports.up = function(knex, Promise) {
    return knex.schema.createTable('emails', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('emails')
};
