import axios from 'axios';
import React from 'react';
import Interests from './Interests';


class CardFinder extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      searchtext: '',
    }
    this.applyEdits = this.applyEdits.bind(this);
  }

  componentDidMount() {
    axios.get('api/cards').then(res => {
      this.setState({cards: res.data})
    }).catch(err => {
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

  searchFunction(e) {
    e.preventdefault();
    axios.get(`url${this.state.searchtext}`);// .then to set card title, img, and mrktprice.
    this.setState({searchtext: ''});
  }

  render() {

    return (
      <section className="main">
        <section className="cardfinder">
          <h1>Card Search</h1>
          <form className="search">
            <input type="text" onChange={e => this.textHandler(e.target.value)}/>
            <button type="submit">Search</button>
          </form >
        </section>
        <Interests applyEditsFn={this.applyEdits} />
      </section>
    )
  }
}

export default CardFinder;