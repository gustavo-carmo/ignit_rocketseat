import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);
// config bla

app.listen(3333, () => {
  console.log('Server running!');
});
