const axios = require('axios');
require('dotenv').config();
const {TCG_PRIVKEY, TCG_PUBKEY, TCG_BEARER} = process.env;

module.exports = {
  cardNameSearch: (req, res) => {
    const {cardName} = req.params;
    let searchids = [];
    const url = 'https://api.tcgplayer.com/catalog/categories/1/search';
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `bearer ${TCG_BEARER}`,
      },
    }
  
    const request = {
      body: JSON.stringify({
        filters: [{values: [`${cardName}`], name: 'ProductName'}],
        offset: 0,
        limit: 25,
        sort: 'Relevance'
      })
    }
  
    axios.post(url, request, headers).then(results => {
      console.log(results.data);

      // res.status(200).send(results.data)
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  
  },
  renewBearerToken(req, res) {
    var body = `grant_type=client_credentials&client_id=${TCG_PUBKEY}&client_secret=${TCG_PRIVKEY}`;
    return axios.post('https://api.tcgplayer.com/token', body, { headers:{'Content-Type' : 'text/plain' }})
    .then(response => {
      var token = response.data.access_token;
      var expires = response.data['.expires'];
      //do more stuff here
      console.log(token);
      res.status(200).send(token)
    })
    .catch(error => {
     console.log(error);
     res.sendStatus(500);
    });
  },


}