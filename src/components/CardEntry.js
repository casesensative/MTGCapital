import React from 'react';
import Modal from './Modal/Modal'


class CardEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editmode: false,
      showmodal: false
    }
    this.editMode = this.editMode.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  editMode() {
    this.setState({editmode: !this.state.editmode});
  }
  openModal() {
    this.setState({showmodal: true});
  }
  closeModal() {
    this.setState({showmodal: false});
  }

  render() {
    const {name, set, amount, mktprice, buyprice, deleteCardFn, id} = this.props;
    let margins = (mktprice-buyprice).toFixed(2);
    if (margins > 0) {
      margins = '+' + margins;
    }

    const editButtons = <tr className="editpopup">
      <button className="toggle-button" onClick={this.openModal}>Edit</button>
      <button className="editbuttons" onClick={() => deleteCardFn(id)}>Delete</button>
      <td><Modal id={id} 
                closeModalFn={this.closeModal} 
                showmodal={this.state.showmodal}
                applyEditsFn = {this.props.applyEditsFn}
                editModeFn={this.editMode}
                cardname={name}>
          </Modal>
      </td>
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
