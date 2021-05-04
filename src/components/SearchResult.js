import React from 'react';


export default function SearchResult(props) {

  const {cardName, cardImg, setName} = props;

  return (
    <div className="searchresults">
      <div className="searchresult">
        {cardName}
        {setName}
        <img src={cardImg} className="imgthumbnail"alt=""/>
      </div>

    </div>
  )
}