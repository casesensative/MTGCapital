import React from 'react';
import '../Modal/modal.css';
const axios = require('axios');

export default class AddModal extends React.Component {
  constructor() {
    super();
    this.state={
      editamount: 0,
      editbuyprice: 0,
      market: false,
      foil: false,
      foilFlag: false,
    }
    this.hasFoil = this.hasFoil.bind(this);
    this.toggleFoil = this.toggleFoil.bind(this);
    this.textHandler = this.textHandler.bind(this);
    this.addCard = this.addCard.bind(this);
  }



  componentDidMount() {
    const {mktFoilPrice, mktPrice} = this.props;
    console.log('marketfoil:', mktFoilPrice);
    console.log('marketprice:', mktPrice);
    if (mktPrice) {
      this.setState({market: true})
    } 
    
    if (mktFoilPrice) {
      this.setState({foil: true})
    }
  }

  toggleFoil() {
    this.setState({foilFlag: !this.state.foilFlag});
    console.log(this.state.market);
  }

  hasFoil() {
    if (!this.state.foil) {
      return null;
    } else if (this.state.foil && this.state.market) {
      return <div>
          <input type="checkbox" id="isfoil" name="isfoil" value="true" onClick={() => {this.toggleFoil()}} />
          <label for="isfoil">Foil</label>
      </div>
    }
  }

  textHandler(input, target) {
    this.setState({[target]: input})
  }

  addCard(e, cardName, setName, mktPrice, mktFoilPrice, buyprice, amount) {
    console.log('I AM ADDING A CARD!!');
    console.log(buyprice);
    console.log(amount);
    const {updateCardsArrayFn} = this.props;
    e.preventDefault();
    if (buyprice && amount) {
      console.log('INPUT FIELDS ARE GOOD!');
      console.log('foil:', this.state.foil);
      console.log('market:', this.state.market);
      console.log('foilFlag:', this.state.foilFlag);
      if (this.state.foil && this.state.market && this.state.foilFlag) {
        axios.post('/api/cards', {cardName, setName, mktFoilPrice, buyprice, amount}).then(res => {
          updateCardsArrayFn(res.data);
        }).catch (err => {
          console.log(err);
        })
      } else if (this.state.foil && this.state.market) {
        console.log('adding market price card');
        axios.post('/api/cards', {cardName, setName, mktPrice, buyprice, amount}).then(res => {
          updateCardsArrayFn(res.data);
        }).catch(err => {
          console.log(err);
        })
      } else if (this.state.foil && !this.state.market) {
        axios.post('/api/cards', {cardName, setName, mktFoilPrice, buyprice, amount}).then(res => {
          updateCardsArrayFn(res.data);
        }).catch (err => {
          console.log(err);
        })
      } else if (!this.state.foil && this.state.market) {
        console.log('adding market price card');
        axios.post('/api/cards', {cardName, setName, mktPrice, buyprice, amount}).then(res => {
          updateCardsArrayFn(res.data);
        }).catch(err => {
          console.log(err);
        })
      }
      this.props.toggleAddModal();
      this.props.clearSearchFn();
    } else {
      alert('Missing fields!');
    }
  }

  // addCard(event, cardName, setName, mktPrice, mktFoilPrice, editbuyprice, editamount) {
  //   event.preventDefault();
  //   this.props.addCardFn(cardName, setName, mktPrice, mktFoilPrice, editbuyprice, editamount);
  //   this.props.toggleAddModal();
  // }


  render() {

    const {addModal, mktFoilPrice, cardName, setName, mktPrice, toggleAddModal} = this.props;
    const {editbuyprice, editamount} = this.state

    if (!addModal) {
      return null;
    };

    // let foil = null;
    // if (!mktFoilPrice) {
    //   return null;
    // } else {
    //   foil = true;
    // };

  return (
      <div className="modal">
        <form className="addmodal" onSubmit={(e) => this.addCard(e, cardName, setName, mktPrice, mktFoilPrice, editbuyprice, editamount)}>
        <div className="modalx">
            <button onClick={() => toggleAddModal()}>X</button>
          </div>
          <p>{cardName}</p>
          <p>{setName}</p>
          <span>Amount:</span><input type="text" 
                                    name="editamount" 
                                    onChange={e => this.textHandler(e.target.value, e.target.name)} />
          <span>Buy Price:</span><input type="text" 
                                        name="editbuyprice"
                                        onChange={e => this.textHandler(e.target.value, e.target.name)} />
          {this.hasFoil()}
          {/* <input type="checkbox" id="isfoil" name="isfoil" value="true" />
          <label for="isfoil">Foil</label><br /> */}
          <button typ="submit" name="addcardbutton">Add</button>
        
        </form>
      </div>
    )
  }
}