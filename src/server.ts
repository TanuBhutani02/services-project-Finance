const app = require('./app');
const PORT = process.env.PORT;
console.log("port",PORT);
app.listen(PORT, () => {
    console.log(`Server is running on the  http://localhost:${PORT}`);
  });

