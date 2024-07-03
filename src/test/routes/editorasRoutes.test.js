import { afterEach, beforeEach } from '@jest/globals';
import app from '../../app';

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});
