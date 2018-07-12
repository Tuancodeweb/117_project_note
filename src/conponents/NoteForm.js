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
    if(this.state.id)
    {
        var editObject = {};
        editObject.id = this.state.id;
        editObject.NoteTitle = this.state.NoteTitle;
        editObject.NoteContents = this.state.NoteContents;


        this.props.EditDataStore(editObject);
        console.log("dang sưa dữ liệu");
    }
    else
    {
      var item =  {};
      item.NoteTitle = title;
      item.NoteContents = content;
      // // gửi dữ liệu lên app để app xử lý
      // this.props.getdata(item)
      // // thông báo
      // console.log("dữ liệu nhập thành công tên là" + JSON.stringify(item) + "ngon lắm em");
      // var item = JSON.stringify(item);
      // tham só nhận ở AddData vẫn phải giữ nguyên nhé
      this.props.AddDataUp(item);
      this.props.ChangeEditStatus(); //tắt form đi khi quá trình lưu thành công
       console.log("dữ liệu nhập thành công tên là" + JSON.stringify(item) + "ngon lắm em");
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
// công dụng : thanh đổi những thuộc tính state ở store
const mapStateToProps = (state, ownProps) => {
  return {
    EditItem:state.EditItem,
    addStatus : state.isAdd
  }
}
// công dụng : sử dụng hàm nào trong store thì chỉ ra nó
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);