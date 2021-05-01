import axios from 'axios';
import React from 'react';
import CardEntry from './CardEntry';


class Interests extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    axios.get('api/cards').then(res => {
      this.setState({cards: res.data})
    }).catch(err => {
      console.log(err)
    })
  }



  render() {
    const {applyEditsFn} = this.props;
    let interestList = this.state.cards.map(card => {
      return (
          <CardEntry key={card.id} name={card.name} id={card.id}
          set={card.set}
          mktprice={card.mktprice}
          buyprice={card.buyprice}
          amount={card.amount} 
          applyEditsFn={applyEditsFn}
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