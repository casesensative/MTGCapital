const express = require('express');
const app = express();
const PORT = 3006;
const cardControl = require('./controllers/cardController');

app.use(express.json());

app.get('/api/cards', cardControl.getCards);
app.post('/api/cards', cardControl.addCard);
app.put('/api/cards/:id', cardControl.editCard);
app.delete('/api/cards/:id', cardControl.deleteCard);




app.listen(PORT, () => console.log('Server now listening on port: ' + PORT));