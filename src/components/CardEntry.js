import React from 'react';


class CardEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editmode: false,
      modal: true
    }
    this.editMode = this.editMode.bind(this);
    this.modalMode = this.modalMode.bind(this);
  }

  editMode() {
    this.setState({editmode: !this.state.editmode});
  }
  modalMode() {
    this.setState({modal: !this.state.modal});
  }

  render() {
    const {name, set, amount, mktprice, buyprice} = this.props;
    let margins = (mktprice-buyprice).toFixed(2);
    if (margins > 0) {
      margins = '+' + margins;
    }

    const editButtons = <tr className="editpopup">
      <button className="editbuttons">Edit</button>
      <button className="editbuttons">Delete</button>
    </tr>


    return (
      <tbody>
        <tr className="cardentry">
          <td className="iname" onClick={() => this.editMode()}>{name}</td>
          <td>{set}</td> 
          <td>{amount}</td> 
          <td>{buyprice}</td> 
          <td>{mktprice}</td>
          <td>{margins}</td>
        </tr>
        {this.state.editmode ? editButtons : ''}
      </tbody>
    )

  }
}

export default CardEntry;
