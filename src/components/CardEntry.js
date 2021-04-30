import React from 'react';


class CardEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editmode: false
    }
    this.editMode = this.editMode.bind(this);
  }

  editMode() {
    this.setState({editmode: !this.state.editmode});
    console.log(this.state.editmode);
  }

  render() {
    const {name, set, amount, mktprice, buyprice} = this.props;
    let margins = (mktprice-buyprice).toFixed(2);
    if (margins > 0) {
      margins = '+' + margins;
    }
    return (
      <tr className="cardentry">
        <td className="iname" onClick={() => this.editMode()}>{name}</td>
        <td>{set}</td> 
        <td>{amount}</td> 
        <td>{buyprice}</td> 
        <td>{mktprice}</td>
        <td>{margins}</td>
      </tr>
    )

  }
}

export default CardEntry;
