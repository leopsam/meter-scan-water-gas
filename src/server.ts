import app, { init, close } from './app';

const port = 4000;

init().then(() => {
  app.listen(port, () => {
    console.log(`HTTP server running on http://localhost:${port}...`);
  });
});
