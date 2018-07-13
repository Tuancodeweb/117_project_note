import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import NoteForm from './NoteForm';
import Notelist from './Notelist';
import {connect} from 'react-redux';
import AlertInfo from './AlertInfo';
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
      // in thông bác màu mè bằng bootstrap qua hàm AlertInfo [react-bs-notifier][GITHUB]
<div>
  <AlertInfo/>
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
// sử dụng :  store chuyền đến các component là công dụng cửa mapStateToProps  (NHƯ KIỂU PHÂN PHỐI ĐẾN CÁC ĐẠI LÝ)
const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}
// sử dụng : muốn thay đổi thuộc tính ở store mà đang ở 1 component lạ thì dùng mapDispatchToProps
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ChangEditstatus: () => {
      dispatch({type:"CHANGE_EDIT_STATUS"})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
