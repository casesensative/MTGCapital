import React from 'react';
import CardEntry from './CardEntry';


class Interests extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }



  render() {
    const {applyEditsFn, deleteCardFn, cards} = this.props;
    let totalArray = cards.map(card => {
      // console.log(typeof card.mktprice);
      // console.log(card.buyprice);
      // console.log(card.amount);
      return +(card.mktprice*card.amount-card.buyprice*card.amount).toFixed(2)
    })

    let total = totalArray.reduce((acc, num) => {
      return +(acc + num).toFixed(2);
    }, 0)

    if (total > 0) {
      total = '+' + total;
    }



    // let totals = [];

    // cards.forEach(card => {
    //   totals.push(Math.ceil((Number(card.mktprice)*Number(card.amount))-(Number(card.buyprice)*Number(card.amount))/100)*100);
    // })

      // console.log(total);
    // }).reduce((a, num) => {
    //   return a + num;
    // })

    let interestList = cards.map(card => {
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
        <div className="interestsheader">
          <h1>INTERESTS</h1>
        </div>



        <table className="intereststable">
          <thead>
            <tr>
              <th>CardName</th>
              <th>Set</th>
              <th>Amount</th>
              <th>Bought</th>
              <th>Market</th>
              <th>+ / -</th>
            </tr>
          </thead>
            {interestList}
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    )
  }
}

export default Interests;