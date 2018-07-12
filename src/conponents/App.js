import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import NoteForm from './NoteForm';
import Notelist from './Notelist';
import {connect} from 'react-redux';
class App extends Component {
  Showform = () => {
    if(this.props.isEdit)
    {
      return(
        <NoteForm/>
      )
    }
  }
  render() {
    return (
<div>
  <Nav/>
  <div className="container">
    <div className="row">
      <Notelist/>
      {
        this.Showform()
      }
    </div>
  </div>
</div>

    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ChangEditstatus: () => {
      dispatch({type:"CHANGE_EDIT_STATUS"})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
