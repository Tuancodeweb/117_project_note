import {firebaseUML} from './FirebaseConnect';

var redux = require('redux');
        const InitialState = {
            isEdit : false,
            EditItem : {},
            isAdd : false
        }
        const allReducer = (state = InitialState, action) => {
            switch (action.type) {
                case "ADD_DATA":
                // đây lầ cách truyền từ reducer đến store => rồi từ store chyển đến các component còn lại
                //định nghĩa với với adddata dựa vào actione.thamso
                // console.log("kết nối thành công với adđata" + action.nhanvao);
                // đi từ store ==> NoteForm ==> App.js
                firebaseUML.push(action.nhanvao);
                return state

                case "CHANGE_EDIT_STATUS":
                return {...state,isEdit:!state.isEdit}

                case "CHANGE_ADD_STATUS":
                return {...state,isAdd:!state.isAdd}

                case "GET_EDIT_ITEM":
                return {...state,EditItem:action.Object}

                case "EDIT":
                //update dữ liệu lên firebase
                // dữ liệu từ firebasr chuyển về form
                firebaseUML.child(action.getItem.id).update({
                NoteTitle : action.getItem.NoteTitle,
                NoteContents : action.getItem.NoteContents,

                })
                return {...state,EditItem:{}}

                case "DELETE":
                    console.log(action.deleteID);
                firebaseUML.child(action.deleteID).remove();
                return state




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