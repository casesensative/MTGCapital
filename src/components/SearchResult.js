import React from 'react';
import AddModal from './AddModal/AddModal';


export default class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      nameHover: false,
    }
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.mktDisplay = this.mktDisplay.bind(this);
    this.foilDisplay = this.foilDisplay.bind(this);
  }

  toggleAddModal() {
    this.setState({addModal: !this.state.addModal})
  }

  mktDisplay(marketprice) {
    if(!marketprice) {
      return null;
    } else {
      return <div>
        <p>Price: {marketprice}</p>
      </div>
    }
  }

  mouseOver = () => {
    this.setState({nameHover: true});
  }
  mouseOut = () => {
    this.setState({nameHover: false});
  }

  foilDisplay(foilprice) {
    if (!foilprice) {
      return null;
    } else {
      return <div>
        <p>Foil: {foilprice}</p>
      </div>
    }
  }

  render() {

  const {cardName, cardImg, setName, mktPrice, mktFoilPrice, updateCardsArrayFn, clearSearchFn} = this.props;



  return (
      <div className="searchresults">
        <div className="searchresult">
          <button class="searchname" onClick={() => {this.toggleAddModal()}} 
                  onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{cardName}</button>
          {/* {this.state.nameHover ? <img src={cardImg} className="imgthumbnail" alt='card'/> : null} */}
          <img src={cardImg} className="imgthumbnail" alt='' />
          {setName}
          {this.mktDisplay(mktPrice)}
          {this.foilDisplay(mktFoilPrice)}
        </div>
        <AddModal addModal={this.state.addModal} 
                  mktFoilPrice={mktFoilPrice} 
                  mktPrice={mktPrice} 
                  cardName={cardName} 
                  setName={setName}
                  toggleAddModal={this.toggleAddModal} 
                  updateCardsArrayFn={updateCardsArrayFn}
                  clearSearchFn={clearSearchFn} />

      </div>
    )
  }
}