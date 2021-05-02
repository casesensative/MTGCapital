import React from 'react';
import CardEntry from './CardEntry';


class Interests extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }



  render() {
    const {applyEditsFn, deleteCardFn} = this.props;
    let interestList = this.props.cards.map(card => {
      return (
          <CardEntry key={card.id.toString()} name={card.name} id={card.id}
          set={card.set}
          mktprice={card.mktprice}
          buyprice={card.buyprice}
          amount={card.amount} 
          applyEditsFn={applyEditsFn}
          deleteCardFn={deleteCardFn}
           />
      )
    })

    return (
      <section className="interests">
        <h1>Interests</h1>



        <table className="intereststable">
          <thead>
            <tr>
              <th>CardName</th>
              <th>Set</th>
              <th>Amount</th>
              <th>BuyPrice</th>
              <th>MarketPrice</th>
              <th>Gains/Losses</th>
            </tr>
          </thead>
            {interestList}
        </table>
      </section>
    )
  }
}

export default Interests;