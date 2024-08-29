import app, { init } from './app';

const port = process.env.PORT;

init().then(() => {
  app.listen(port, () => {
    console.log(`HTTP server running on http://localhost:${port}...`);
  });
});
