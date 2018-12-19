exports.up = function(knex, Promise) {
  return knex.schema.createTable("notas", function(table) {
    table.increments("oid");
    table.string("titulo", 50).notNullable();
    table.string("descricao", 250).notNullable();
    table.integer("tipo").notNullable();
    table.date("data").notNullable();
    table.boolean("feito");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notas");
};
