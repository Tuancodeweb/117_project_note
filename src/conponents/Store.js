import {firebaseUML} from './FirebaseConnect';

var redux = require('redux');
        const InitialState = {
            // hàm  thuộc state sửa
            isEdit : false,
            EditItem : {},
            // hàm thuộc state thêm
            isAdd : false,
            // hàm thuộc state show thông báo
            AlertShow : false,
            // hàm thuộc state show nội dung thông báo
            AlertContent : '',
            // hàm thuộc state showw màu nội dung thông báo
            AlertStyle : ''
        }
        const allReducer = (state = InitialState, action) => {
            switch (action.type) {
                case "ADD_DATA":
            //1   // đây lầ cách truyền từ reducer đến store => rồi từ store chyển đến các component còn lại
                //định nghĩa với với adddata dựa vào actione.thamso
                // console.log("kết nối thành công với adđata" + action.nhanvao);
                // đi từ store ==> NoteForm ==> App.js
                firebaseUML.push(action.nhanvao);
                return state
            //2    // lệnh hiển thị form để sưa note
                case "CHANGE_EDIT_STATUS":
                return {...state,isEdit:!state.isEdit}


            //3    // lệnh hiển thị form để thêm note
                case "CHANGE_ADD_STATUS":
                return {...state,isAdd:!state.isAdd}


            //4    // lệnh thêm đối tượng vừa nhập vào form sưa note
                case "GET_EDIT_ITEM":
                return {...state,EditItem:action.Object}


            //5    // lệnh lấy thông tin note đã sửa chuyển vào firebase
                case "EDIT":
                //update dữ liệu lên firebase
                // dữ liệu từ firebasr chuyển về form
                firebaseUML.child(action.getItem.id).update({
                NoteTitle : action.getItem.NoteTitle,
                NoteContents : action.getItem.NoteContents,

                })
                return {...state,EditItem:{}}



            //6    // lệnh xóa note dựa vào key
                case "DELETE":
                    console.log(action.deleteID);
                firebaseUML.child(action.deleteID).remove();

            //7 // hiển thị thông báo bootstrap , hiển thị nội dung
                case "ALERT_ON":
                return {...state,AlertShow:true , AlertContent:action.AlertContent ,AlertStyle:action.AlertStyle}
            //8 // tắt  hiển thị thông báo bootstrap
                case "ALERT_OFF":
                return {...state,AlertShow:false}
                default:
                    return state
            }
        }
var store = redux.createStore(allReducer);
/// lấy được thống số đưa lên store
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()))
})


export default store;