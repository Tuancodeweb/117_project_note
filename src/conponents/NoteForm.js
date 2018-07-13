import React, { Component } from 'react';
import {connect} from 'react-redux';
class NoteForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      NoteTitle : '',
      NoteContents : '',
      id:''
    }
  }
  // in dữ liệu vào DEV tool của react trước khi quá trình render diễn ra
  componentWillMount() {
    if(this.props.EditItem)
    {
      this.setState({
          NoteTitle : this.props.EditItem.NoteTitle,
          NoteContents : this.props.EditItem.NoteContents,
          id : this.props.EditItem.id
      })
    }
  }
  

  isChange = (event) => {
     var name =  event.target.name;
     var value = event.target.value;
     console.log(name);
     console.log(value);
     this.setState({
       [name] : value
     })
  }

  addData = (title,content) => {
    if(this.state.id)   // trường hợp sửa dựa vào thông tin ID , title , content
    {
        var editObject = {};
        editObject.id = this.state.id;
        editObject.NoteTitle = this.state.NoteTitle;
        editObject.NoteContents = this.state.NoteContents;
        this.props.EditDataStore(editObject);
        this.props.ChangeEditStatus(); //tắt form đi khi quá trình lưu thành công
        this.props.AlertOn("sửa thành công ","success"); // hiển thị thông báo bootstrap
    }
    else    // trường hợp thêm mới 
    {
      var item =  {};
      item.NoteTitle = title;
      item.NoteContents = content;
      // // gửi dữ liệu lên app để app xử lý
      this.props.AddDataUp(item);
      this.props.AlertOn("thêm mới thành công","success");  // hiển thị thông báo bootstrap
    }
  }

  printTitle = () => 
  {
    if(this.props.addStatus)
    {
      //true = add case
      return <h4>Thêm mới</h4>;
    }
    else
    {
      return <h4>Sửa ghi chú</h4>;
    }
  }
    render() {
        return (
    <div className="col-4">
          <form>
          {this.printTitle()}
          <div className="form-group">
            <label htmlFor="NoteTitle">Tiêu đề node</label>
            <input defaultValue={this.props.EditItem.NoteTitle} type="text" onChange={(event) => {this.isChange(event)}} className="form-control" name="NoteTitle" id="NoteTitle" aria-describedby="NoteNoteTitle" placeholder="Tiêu đề của note1" />
            <small id="NoteNoteTitle" className="form-text text-muted">Điền tiêu đề vào đây</small>
          </div>
          <div className="form-group">
            <label htmlFor="NoteTitle">Tiêu đề node</label>
            <textarea defaultValue={this.props.EditItem.NoteContents} type="text" onChange={(event) => {this.isChange(event)}} className="form-control" name="NoteContents" id="NoteTitle" aria-describedby="NoteNoteTitle" placeholder="Tiêu đề của note1"/>
            <small id="NoteNoteTitle" className="form-text text-muted">Điền nội dung vào đây</small>
          </div>
          <button  type="reset" onClick={() => this.addData(this.state.NoteTitle , this.state.NoteContents)} className="btn btn-warning btn-block">Lưu</button>
          </form>
      </div>
        );
    }
}
// sử dụng :  store chuyền đến các component là công dụng cửa mapStateToProps  (NHƯ KIỂU PHÂN PHỐI ĐẾN CÁC ĐẠI LÝ)
const mapStateToProps = (state, ownProps) => {
  return {
    EditItem:state.EditItem,
    addStatus : state.isAdd
  }
}
// sử dụng : muốn thay đổi thuộc tính ở store mà đang ở 1 component lạ thì dùng mapDispatchToProps
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // nhanvao được truyền từ STORE.js
    // đây là cách chuyền lại
    AddDataUp: (nhanvao) => {
      dispatch({
        type:"ADD_DATA",
        nhanvao
      })
    },
    EditDataStore: (nhanvao) => {
      dispatch({
        type:"EDIT",
        nhanvao
      })
    },
    ChangeEditStatus: () => {
      dispatch({
        type:"CHANGE_EDIT_STATUS"
      })
    },
    AlertOn: (AlertContent , AlertStyle) => {
      dispatch({
        type:"ALERT_ON",
        AlertContent,
        AlertStyle
      })
    },
    AlertOff: () => {
      dispatch({
        type:"ALERT_OFF"
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);