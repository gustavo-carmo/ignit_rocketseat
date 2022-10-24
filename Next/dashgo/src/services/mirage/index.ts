import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function mirageServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name() {
          return faker.name.fullName();
        },
        email(i) {
          const mail_providers = ['yahoo', 'gmail', 'hotmail']
          return `${this.name.toLowerCase().replaceAll('mrs', '').replaceAll('mr', '').replaceAll('ms', '').replaceAll('.', '').trim().replaceAll(' ', '-')}@${mail_providers[i % mail_providers.length]}.com`;
        },
        createdAt() {
          return faker.date.recent(30);
        }
      })
    },
    seeds(server) {
      server.createList('user', 157);
    },
    routes() {
      // this.urlPrefix = 'http://localhost:8080'; // TODO testar
      this.namespace = 'api';
      this.timing = 750; // 0.75 seconds

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd);


        return new Response(
          200,
          { "x-total-count": String(total) },
          { users }
        );
      })
      this.get('/users/:id');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  })

  return server;
}
