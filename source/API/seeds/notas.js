exports.seed = function(knex, Promise) {
  return knex('notas').del()
    .then(function () {
      return knex('notas').insert([
        {oid: 1, titulo: 'Entregar API do Bullet', descricao: "API do Bullet Journal", tipo: 1, data: "2018-12-20", feito: false},
        {oid: 2, titulo: 'Entregar Bullet Web', descricao: "React", tipo: 2, data: "2018-12-20", feito: false},
        {oid: 3, titulo: 'Entregar Bullet Native', descricao: "React Native", tipo: 3, data: "2018-12-20", feito: false}
      ]);
    });
};