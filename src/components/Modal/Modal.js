import React from 'react';
import './modal.css'

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      editamount: 0,
      editbuyprice: 0,
      editid: 0,
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentDidMount() {
    this.setState({editid: this.props.id})
  }
  inputHandler(text, target) {
    this.setState({[target]: text})
  }

  apply() {
    const {editid, editamount, editbuyprice} = this.state;
    console.log('editID:', editid);
    console.log('editAmount:', editamount);
    console.log('editBuyPrice:', editbuyprice);
    this.props.applyEditsFn(editid, editamount, editbuyprice);
    this.props.closeModalFn();
  }


  render() {
    const {closeModalFn, showmodal} = this.props;
    if(!showmodal) {
      return null;
    };


    return (
      <div className="modal-main">
        <div className="modalx">
          <button onClick={() => closeModalFn()}>X</button>
        </div>
        <div>
          <span>Amount:</span><input type="text" name="editamount" placeholder="Amount" onChange={e => this.inputHandler(e.target.value, e.target.name)}/>
          <span>Buy Price:</span><input name="editbuyprice" type="text" placeholder="Amount" onChange={e => this.inputHandler(e.target.value, e.target.name)}/>
          <span><button onClick={() => this.apply()}>Apply</button></span>
        </div>
        <div className="deletebut">
        <button>Delete</button>
        </div>
        

      </div>
    )
  }
}