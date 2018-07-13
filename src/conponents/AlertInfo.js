import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import {connect} from 'react-redux';
class AlertInfo extends Component {
    hanlderAlert = () => {
        this.props.AlertOff();
    }
    render() {
        if(this.props.AlertShow === false) return null
        return (
            <AlertContainer position="bottom-right">
                <Alert type={this.props.AlertStyle} onDismiss={() => this.hanlderAlert() } timeout={1000}>
                        {this.props.AlertContent}
                </Alert>
	        </AlertContainer>
        );
    }
}
// sử dụng :  store chuyền đến các component là công dụng cửa mapStateToProps  (NHƯ KIỂU PHÂN PHỐI ĐẾN CÁC ĐẠI LÝ)
const mapStateToProps = (state, ownProps) => {
    return {
        AlertShow: state.AlertShow,
        AlertContent: state.AlertContent,
        AlertStyle : state.AlertStyle
    }
}
// sử dụng : muốn thay đổi thuộc tính ở store mà đang ở 1 component lạ thì dùng mapDispatchToProps
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AlertOff: () => {
            dispatch({
                type:"ALERT_OFF"
            })
        },
        AlertOn: () => {
            dispatch({
              type:"ALERT_ON"
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo);