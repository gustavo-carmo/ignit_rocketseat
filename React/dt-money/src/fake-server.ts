import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer create site',
          amount: 5000,
          type: 'deposit',
          category: 'Pagamento',
          created_at: new Date('2022-04-01 16:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 1500,
          type: 'withdraw',
          category: 'Pagamento',
          created_at: new Date('2022-04-08 16:00:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});