import React, { Component } from 'react';
import {connect} from 'react-redux';
class NoteItem extends Component {

      twoActionButton = () => {
        // công việc 1 thay đổi trạng thái của form sửa
        this.props.ChangEditstatus();
        // in ra cái note
        // console.log(this.props.note);
        // công việc 2 lấy dữ liệu
        this.props.GetEditData(this.props.note);
      }
      // công vuệc xóa phần tử
      deleteData = () => {
        this.props.GetDeleteData(this.props.note.key);
        // console.log(this.props.note);
        this.props.AlertOn("xóa phần tử" + " " + this.props.note.NoteTitle + " " + "thành công" , "danger");
      }
    render() {
        return (
            <div>
            <div className="card">
            <div className="card-header" role="tab" id="note1">
              <h5 className="mb-0">
                <a data-toggle="collapse" data-parent="#NoteList" href={"#number" + this.props.i} aria-expanded="true" aria-controls="noteContent1">
                  {this.props.NoteTitle}
                </a>
                <div className="btn-group float-right">
                    <button className="btn btn-outline-info" onClick={() => this.twoActionButton()}>Sửa</button>
                    <button className="btn btn-outline-secondary" onClick={()=>this.deleteData()}> Xóa </button>
                </div>
              </h5>
            </div>
            <div id={"number" + this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
              <div className="card-body">
                {this.props.NoteContents}
              </div>
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
      dispatch({
        type: "CHANGE_EDIT_STATUS"
      })
    },
    GetEditData: (Object) => {
      dispatch({
        type: "GET_EDIT_ITEM",
        Object
      })
    },
    GetDeleteData : (deleteID) => {
      dispatch({
        type: "DELETE",
        deleteID
      })
    },
    AlertOn: (AlertContent) => {
      dispatch({
        type:"ALERT_ON",
        AlertContent
      })
    },
    AlertOff: () => {
      dispatch({
        type:"ALERT_OFF"
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);