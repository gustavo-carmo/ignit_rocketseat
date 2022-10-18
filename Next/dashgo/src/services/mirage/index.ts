import { createServer, Factory, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function mirageServer() {
  const server = createServer({
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
      server.createList('user', 15);
    },
    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users')
      this.post('/users')

      this.namespace = '';
      this.passthrough();
    }
  })

  return server;
}
