import axios from 'axios';
import React from 'react';
import Interests from './Interests';
import SearchResult from './SearchResult';


class CardFinder extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      searchtext: '',
      searchResults: [],
      groupResults: [],
    }
    this.applyEdits = this.applyEdits.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.setsUpdate = this.setsUpdate.bind(this);
    this.cardSearch = this.cardSearch.bind(this);
    this.getCardSets = this.getCardSets.bind(this);
    this.updateCardsArray = this.updateCardsArray.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
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


  cardSearch(name, e) {
    e.preventDefault();
    console.log(name);
    axios.get(`/api/testsearch/${name}`).then(res => {
      console.log('MY RES.DATA:', res.data);
      this.setState({searchResults: res.data});

      this.getCardSets(res.data);
      setTimeout(this.setsUpdate, 1500);

    }).catch(err => {
      console.log(err)
    })
  }
  setsUpdate() {
    const {searchResults, groupResults} = this.state;
    const resultsCopy = [...searchResults];
    console.log(resultsCopy);
    console.log('Group Results:', groupResults)
    for (let i = 0;i < resultsCopy.length; i++) {
      for (let j = 0; j < groupResults.length; j++) {
        if (resultsCopy[i].groupId === groupResults[j].groupId) {
          resultsCopy[i].setName = groupResults[j].name;

        }
      }
    }
    this.setState({searchResults: resultsCopy});
    console.log('Final COPY:', resultsCopy);
  }

  getCardSets(data) {
    const groupMap = data.map(card => {
      return card.groupId;
    });
    const sparams = groupMap.join(',');
    axios.get(`/api/groupsearch/${sparams}`).then(res => {
      console.log('res.data:', res.data);
      this.setState({groupResults: res.data})
      console.log('groupresultsafterstateset:', this.state.groupResults)
    }).catch(err => {
      console.log(err);
    })
  }

  clearSearch() {
    this.setState({searchtext: ''});
  }

  updateCardsArray(data) {
    this.setState({cards: data});
  }

  

  render() {
 
    const {searchResults} = this.state;

    

    let displayResults = searchResults.map((card, i) =>{
      return <SearchResult mktPrice={card.NormalPrice} 
                            mktFoilPrice={card.FoilPrice} 
                            cardName={card.name} 
                            cardImg={card.imageUrl} 
                            setName={card.setName} 
                            updateCardsArrayFn={this.updateCardsArray}
                            key={i}
                            clearSearchFn={this.clearSearch} />
    })

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
          <div className="flexresults">{displayResults}</div>
        </section>
        <Interests applyEditsFn={this.applyEdits} cards={this.state.cards}
        deleteCardFn={this.deleteCard} />
      </section>
    )
  }
}

export default CardFinder;