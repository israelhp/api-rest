require('./utils/connectiondb');
const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`);
});
