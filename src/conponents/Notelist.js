import React, { Component } from 'react'
import {firebaseUML} from './FirebaseConnect';
import NoteItem from './NoteItem';
  

class Notelist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataFirebase :[]
    }
  }
  // hàm được thực hiện trước khi render
  componentWillMount() {
      // lấy dữ liệu ở firebase để in ra
      firebaseUML.on('value',(notes)=>
      {
        // arraydata là mảng rỗng
          var arraydata = [];
        // vòng lặp forearch
        notes.forEach(element => {
          // . nấy được key , title , contents
            const key = element.key;
            const NoteTitle = element.val().NoteTitle;
            const NoteContents = element.val().NoteContents;
            // push arraydata lên firebase
            arraydata.push({
              key:key,
              NoteTitle:NoteTitle,
              NoteContents:NoteContents
            })
        });
        // in ra
        // sau khi lấy được mảng ở data mình setstates
        this.setState({
          dataFirebase:arraydata
        });
       
      })
  }

  
  getdata = () => {
     if(this.state.dataFirebase)
     {
       // trả về cho hàm map 
        return this.state.dataFirebase.map((value,key) => {
          // trả về cho hàm mapdata
            return(
              <NoteItem
                key={key}
                i={key}
                note={value}
                NoteTitle={value.NoteTitle}
                NoteContents={value.NoteContents}
              />
            )
        });
     }
  }
    render() {
        return (
          <div className="col">
          <div id="NoteList" role="tablist" aria-multiselectable="true">
          {
            this.getdata()
          }
          </div>
        </div>
        );
    }
}

export default Notelist;