
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3006;

const apiControl = require('./controllers/apiControl');
const cardControl = require('./controllers/cardController');

app.use(express.json());

// function renewBearerToken(req, res) {
//   var body = `grant_type=client_credentials&client_id=${TCG_PUBKEY}&client_secret=${TCG_PRIVKEY}`;
//   return axios.post('https://api.tcgplayer.com/token', body, { headers:{'Content-Type' : 'text/plain' }})
//   .then(response => {
//     var token = response.data.access_token;
//     var expires = response.data['.expires'];
//     //do more stuff here
//     console.log(token);
//     res.status(200).send(token)
//   })
//   .catch(error => {
//    console.log(error);
//    res.sendStatus(500);
//   });
// };

// function cardSearch(req, res) {
//   const {namevariable} = req.params;
//   const url = 'https://api.tcgplayer.com/catalog/categories/1/search';
//   const headers = {
//     headers: {
//       'Accept': 'application/json',
//       'Authorization': `bearer ${TCG_BEARER}`,
//     },
//   }

//   const request = {
//     body: JSON.stringify({
//       filters: [{values: ['Sacred'], name: 'ProductName'}],
//       offset: 0,
//       limit: 25,
//       sort: 'Relevance'
//     })
//   }

//   axios.post(url, request, headers).then(results => {
//     console.log(results.data);
//     res.status(200).send(results.data)
//   }).catch(err => {
//     console.log(err);
//     res.sendStatus(500);
//   })

// }

// const options = {
//   method: 'POST',
//   headers: {'Accept': 'application/json', 'Content-Type': 'text/json', 'Authorization': `bearer ${TCG_BEARER}`},
//   body: JSON.stringify({filters: [{values: ['Sacred'], name: 'ProductName'}], limit: 10})
// };

// const options = {
//   headers: {
//     'Accept': 'application/json',
//     'Authorization': `bearer ${TCG_BEARER}`,
//   },
// }

// const request = {
//   "filters": [
//     {
//       "name": "ProductName",
//       "values": [
//         "Sacred",
//       ],
//     },
//   ],
//   "offset": "0",
//   "sort": "ProductName ASC",
//   "limit": "100",
// }



// function cardSearch(req, res) {
//   axios.post(
//     'https://api.tcgplayer.com/v1.39.0/catalog/categories/1/search',
//     request,
//     options,
//   ).then((response) => {
//     res.status(200).send(response.data);
//     console.log(response);
//   }, (error) => {
//     res.sendStatus(500);
//     console.log(error);
//   })
// }



// app.get('/api/token', renewBearerToken);
app.get('/api/testsearch/:cardName', apiControl.cardNameSearch);
app.get('/api/groupsearch/:groupId', apiControl.getCardSet);
// app.get('/api/marketprices/', apiControl.getMarketPrices);




app.get('/api/cards', cardControl.getCards);
app.post('/api/cards', cardControl.addCard);
app.put('/api/cards/:id', cardControl.editCard);
app.delete('/api/cards/:id', cardControl.deleteCard);




app.listen(PORT, () => console.log('Server now listening on port: ' + PORT));



