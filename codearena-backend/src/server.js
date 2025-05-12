const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`codearena-backend started on port ${PORT}`);
});