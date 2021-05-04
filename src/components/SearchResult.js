import React from 'react';


export default function SearchResult(props) {

  const {cardName, cardImg, setName, mktPrice, mktFoilPrice} = props;

  return (
    <div className="searchresults">
      <div className="searchresult">
        {cardName}
        {setName}
        <img src={cardImg} className="imgthumbnail"alt=""/>
        Market Price:{mktPrice}
        Foil Price:{mktFoilPrice}
      </div>

    </div>
  )
}