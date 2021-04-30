let cardCollection = [
  {
    id: 1,
    name: 'Liliana, of the Dark Realms',
    set: '10th Edition',
    amount: 2,
    mktprice: 26.60,
    buyprice: 22.24

  },
  {
    id: 2,
    name: 'Testcard2',
    set: 'Test Edition',
    amount: 4,
    mktprice: 2.38,
    buyprice: 0.54
  },
  {
    id: 3,
    name: 'Gilded Lotus',
    set: 'Secret Lair Series',
    amount: 1,
    mktprice: 5.50,
    buyprice: 10.25
  }
];

let id = 4;

module.exports = {

  getCards: (req, res) => {
    res.status(200).send(cardCollection);
  },

  addCard: (req, res) => {
    const {name, set, mktprice, buyprice, amount} = req.body;
    if (name && set && mktprice && buyprice && amount) {
      cardCollection.push({name, set, mktprice, buyprice, amount, id: id });
      id++;
      res.status(200).send(cardCollection);
  } else {
    res.status(500).send('Provided information incomplete.')
  }

  },

  editCard: (req, res) => {
    const {id} = req.params;
    const {buyprice, amount} = req.body;
    const ix = cardCollection.findIndex(card => {
      return parseInt(id) === card.id;
    });
    
    if (ix) {
      const ucard = {
        ...cardCollection[ix],
        buyprice: buyprice || cardCollection[ix].buyprice,
        amount: amount || cardCollection[ix].amount,

      }
      cardCollection.splice(ix, 1, ucard);
      res.status(200).send(cardCollection);
    } else {
      res.status(500).send('No card with that ID found.')
    }

  },

  deleteCard: (req, res) => {
    const {id} = req.params;
    const ix = cardCollection.findIndex(card => {
      return parseInt(id) === card.id;
    });

    if (ix === -1) {
      res.status(500).send('No card with that ID found.')
    } else {
      cardCollection.splice(ix, 1);
      res.status(200).send(cardCollection);
    }

  }

}