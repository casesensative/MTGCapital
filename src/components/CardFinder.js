import axios from 'axios';
import React from 'react';
import Interests from './Interests';


class CardFinder extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      searchtext: '',
      searchResults: [],
    }
    this.applyEdits = this.applyEdits.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    axios.get('api/cards').then(res => {
      this.setState({cards: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  deleteCard(id) {
    axios.delete(`/api/cards/${id}`).then(res => this.setState({cards: res.data})).catch(err => {
      console.log(err)
    })
  }

  applyEdits(id, editamount, editbuyprice) {
    axios.put(`/api/cards/${id}`, {amount: editamount, buyprice: editbuyprice}).then(res => {
      this.setState({cards: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  textHandler(text) {
    this.setState({searchtext: text})
  }

  // searchFunction(e) {
  //   e.preventdefault();
  //   axios.get(`url${this.state.searchtext}`);// .then to set card title, img, and mrktprice.
  //   this.setState({searchtext: ''});
  // }

  cardSearch(name, e) {
    e.preventDefault();
    console.log(name);
    axios.get(`/api/testsearch/${name}`).then(res => {
      console.log(res.data);
      this.setState({searchResults: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  render() {

    return (
      <section className="main">
        <section className="cardfinder">
          <div className="cardfinderheader">
            <h1>CARD SEARCH</h1>
          </div>
          <form className="search">
            <input type="text" onChange={e => this.textHandler(e.target.value)}/>
            <button type="submit" onClick={(e) => this.cardSearch(this.state.searchtext, e)}>Search</button>
          </form >
        </section>
        <Interests applyEditsFn={this.applyEdits} cards={this.state.cards}
        deleteCardFn={this.deleteCard} />
      </section>
    )
  }
}

export default CardFinder;