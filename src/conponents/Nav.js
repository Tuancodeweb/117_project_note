import React, { Component } from 'react';
import {connect} from 'react-redux';
class Nav extends Component {
  handleadd = (event) => {
        event.preventDefault();
        this.props.ChangeEditStatus();
        this.props.ChangeAddStatus();
  }
    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark mb-4" style={{backgroundColor: 'black', color: 'white'}}>
              <a className="navbar-brand" href="#">NOTE</a>
              <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
              <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                <ul className="navbar-nav mt-2 mt-lg-0 ">
                  <li className="nav-item active">
                    <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://zing.vn" onClick={(event) => this.handleadd(event)}>NOTE NEW</a>
                  </li>
                </ul>
              </div>
            </nav>
            {/* ket thuc menu top */}
        </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // prop: state.prop
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ChangeEditStatus: () => {
      dispatch({
        type:"CHANGE_EDIT_STATUS"
      })
    },
    ChangeAddStatus: () => {
      dispatch({
        type:"CHANGE_ADD_STATUS"
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);