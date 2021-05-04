const axios = require('axios');
require('dotenv').config();
const {TCG_PRIVKEY, TCG_PUBKEY, TCG_BEARER} = process.env;
const headers = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `bearer ${TCG_BEARER}`,
  },
}

const searchids = '';

module.exports = {
  cardNameSearch: (req, res) => {
    const {cardName} = req.params;
    let searchids = [];
    const url = 'https://api.tcgplayer.com/catalog/categories/1/search';
    const url2 = 'https://api.tcgplayer.com/catalog/products/';

    const request = {
      filters: [{ name: 'ProductName', values: [`${cardName}`] }],
      offset: 0,
      limit: 25,
      sort: 'Relevance'
    }
  
    axios.post(url, request, headers).then(results => {
      console.log(results.data);
      searchids = results.data.results.join(',');
      console.log('SEARCH_IDS:', searchids);
      axios.get(url2 + `${searchids}`, headers).then(dresults => {
        let productArray = dresults.data.results;
        

        res.status(200).send(dresults.data.results);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      })

      // res.status(200).send(searchids);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  
  },
  getCardSet: (req, res) => {
    const {groupId} = req.params;
    axios.get(`https://api.tcgplayer.com/catalog/groups/${groupId}`, headers).then(results => {
      // console.log(results.data);
      res.status(200).send(results.data.results);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  },
  getMarketPrices: (req, res) => {
    // const {mktPrice} = req.params;
    axios.get(`https://api.tcgplayer.com/pricing/product/${searchids}`, headers).then(results => {
      console.log('API Prices:', results.data);
      res.status(200).send(results.data.results);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  },
  renewBearerToken: (req, res) => {
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