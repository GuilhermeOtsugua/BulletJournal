import knex from "../config/knex";

const requestHandler = (request, reply) => {
  return (
    knex
      .from("notas")
      .where({ feito: false })
      .select("oid", "titulo", "descricao", "tipo", "data", "feito")
      .then(results => reply.response(results))
      .catch(err => console.log(err))
  );
};

const notas = [
  {
    method: "GET",
    path: "/notas",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  },
  {
    method: "GET",
    path: "/notas/",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  },
  {
    method: "GET",
    path: "/notas/{nota_id}",
    handler: (request, reply) => {
      const id = request.params.nota_id;
      return (
        knex
          .from("notas")
          .where("oid", id)
          .select("oid", "titulo", "descricao", "tipo", "data", "feito")
          .then(results => reply.response(results))
          .catch(err => console.log(err))
      );
    }
  },
  {
    method: "GET",
    path: "/notas/{nota_id}/",
    handler: (request, reply) => {
      const id = request.params.nota_id;
      return (
        knex
          .from("notas")
          .where("oid", id)
          .select("oid", "titulo", "descricao", "tipo", "data", "feito")
          .then(results => reply.response(results))
          .catch(err => console.log(err))
      );
    }
  },
  {
    method: "POST",
    path: "/notas",
    handler: (request, reply) => {
      console.log(request.payload.titulo);
      try {
        let { titulo, descricao, tipo, data } = JSON.parse(request.payload);

        if ( titulo === undefined) {
          titulo = "";
          return reply.response({ error: "O titulo não está indefinido" }).code(400);
        }

        if ( descricao === undefined) {
          descricao = "";
          return reply.response({ error: "A descrição não está indefinido" }).code(400);
        }

        if ( tipo === undefined) {
          tipo = "";
          return reply.response({ error: "O tipo não está indefinido" }).code(400);
        }

        if ( data === undefined) {
          data = "";
          return reply.response({ error: "A data não está indefinido" }).code(400);
        }

        const nota = {
          feito: false
        };

        return knex
          .into("notas")
          .insert(nota)
          .then(result => {
            nota.oid = result[0];
            return reply.response({ status: "inserido", data: nota }).code(201);
          })
          .catch(err => {
            return reply.response(err).code(400);
          });
      } catch (err) {
        return reply.response({ error: "nota indefinida no objeto json" }).code(400)
      }
    }
  },
  {
    method: "POST",
    path: "/notas/",
    handler: (request, reply) => {
      try {
        let { titulo, descricao, tipo, data } = JSON.parse(request.payload);

        if ( titulo === undefined) {
          titulo = "";
          return reply.response({ error: "O titulo não está indefinido" }).code(400);
        }

        if ( descricao === undefined) {
          descricao = "";
          return reply.response({ error: "A descrição não está indefinido" }).code(400);
        }

        if ( tipo === undefined) {
          tipo = "";
          return reply.response({ error: "O tipo não está indefinido" }).code(400);
        }

        if ( data === undefined) {
          data = "";
          return reply.response({ error: "A data não está indefinido" }).code(400);
        }

        const nota = {
          titulo: titulo,
          descricao: descricao,
          tipo: tipo,
          data: data,
          feito: false
        };

        return knex
          .into("notas")
          .insert(nota)
          .then(result => {
            nota.oid = result[0];
            return reply.response({ status: "inserido", data: nota }).code(201);
          })
          .catch(err => {
            return reply.response({error: err}).code(400);
          });
      } catch (err) {
        return reply.response({ error: "nota indefinida no objeto json" }).code(400)
      }
    }
  },
  {
    method: "PUT",
    path: "/notas/{nota_id}",
    handler: (request, reply) => {
      try {
        const { titulo, descricao, tipo, data } = JSON.parse(request.payload);
        const id = request.params.nota_id;
        let nota = {};

        if ( titulo != undefined) {
          nota.titulo = titulo;
        }

        if ( descricao != undefined) {
          nota.descricao = descricao;
        }

        if ( tipo != undefined) {
          nota.tipo = tipo;
        }

        if ( data != undefined) {
          nota.data = data;
        }

        return knex("notas")
          .where("oid", id)
          .updata(nota)
          .then(result => 
            knex("notas")
              .where("oid", id)
              .select("oid", "titulo", "descricao", "tipo", "data")
              .then(result => 
                reply.response({ status: "atualizado", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response({error: err}).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/notas/{nota_id}/",
    handler: (request, reply) => {
      try {
        const { titulo, descricao, tipo, data } = JSON.parse(request.payload);
        const id = request.params.nota_id;
        let nota = {};

        if ( titulo != undefined) {
          nota.titulo = titulo;
        }

        if ( descricao != undefined) {
          nota.descricao = descricao;
        }

        if ( tipo != undefined) {
          nota.tipo = tipo;
        }

        if ( data != undefined) {
          nota.data = data;
        }

        return knex("notas")
          .where("oid", id)
          .updata(nota)
          .then(result => 
            knex("notas")
              .where("oid", id)
              .select("oid", "titulo", "descricao", "tipo", "data")
              .then(result => 
                reply.response({ status: "atualizado", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response({error: err}).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/notas/{nota_id}/feito",
    handler: (request, reply) => {
      try {
        const id = request.params.nota_id;
        let nota = { feito: true };

        return knex("notas")
          .where("oid", id)
          .updata(nota)
          .then(result => 
            knex("notas")
              .where("oid", id)
              .select("oid", "titulo", "descricao", "tipo", "data")
              .then(result => 
                reply.response({ status: "feito", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/notas/{nota_id}/feito/",
    handler: (request, reply) => {
      try {
        const id = request.params.nota_id;
        let nota = { feito: true };

        return knex("notas")
          .where("oid", id)
          .updata(nota)
          .then(result => 
            knex("notas")
              .where("oid", id)
              .select("oid", "titulo", "descricao", "tipo", "data")
              .then(result => 
                reply.response({ status: "feito", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/notas/{nota_id}/unfeito",
    handler: (request, reply) => {
      try {
        const id = request.params.nota_id;
        let nota = { feito: false };

        return knex("notas")
          .where("oid", id)
          .updata(nota)
          .then(result => 
            knex("notas")
              .where("oid", id)
              .select("oid", "titulo", "descricao", "tipo", "data")
              .then(result => 
                reply.response({ status: "unfeito", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/notas/{nota_id}/unfeito/",
    handler: (request, reply) => {
      try {
        const id = request.params.nota_id;
        let nota = { feito: false };

        return knex("notas")
          .where("oid", id)
          .updata(nota)
          .then(result => 
            knex("notas")
              .where("oid", id)
              .select("oid", "titulo", "descricao", "tipo", "data")
              .then(result => 
                reply.response({ status: "unfeito", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "DELETE",
    path: "/notas/{nota_id}",
    handler: (request, reply) => {
      const id = request.params.nota_id;

      const nota = knex
          .from("notas")
          .where("oid", id)
          .select("oid", "titulo", "descricao", "tipo", "data", "feito")
          .then(results => reply.response(results))
          .catch(err => console.log(err));

      return knex("notas")
        .where("oid", id)
        .del()
        .then(result => {
          if (result === 0) {
            return reply.response({ status: "not deleted", message: "nota not found"}).code(409);
          } else {
            return reply.response({ status: "deleted", data: nota})
          }
        })
        .catch(err => reply.response(err).code(401));
    }
  },
  {
    method: "DELETE",
    path: "/notas/{nota_id}/",
    handler: (request, reply) => {
      const id = request.params.nota_id;

      const nota = knex
          .from("notas")
          .where("oid", id)
          .select("oid", "titulo", "descricao", "tipo", "data", "feito")
          .then(results => reply.response(results))
          .catch(err => console.log(err));

      return knex("notas")
        .where("oid", id)
        .del()
        .then(result => {
          if (result === 0) {
            return reply.response({ status: "not deleted", message: "nota not found"}).code(409);
          } else {
            return reply.response({ status: "deleted", data: nota})
          }
        })
        .catch(err => reply.response(err).code(401));
    }
  }
];

export default notas;