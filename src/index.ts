import 'module-alias/register';
import app from './App';

const port = process.env.PORT || 3000;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.listen(port, (...err: any): void => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
