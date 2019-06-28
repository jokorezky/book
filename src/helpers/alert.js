import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ToastContainer } from "react-toastr";
let container;

class Alert extends Component {
    componentDidMount () {
        console.log('ini component alert')
        container.success(`hi! Now is ${new Date()}`, `///title\\\\\\`, {
          closeButton: true,
        })
      }
      render() {
        return (
          <div>
            <ToastContainer
              ref={ref => container = ref}
              tapToDismiss = {true}
              className="toast-top-right"
            />
          </div>
        );
      }
}
export const AlertComponent = connect()(Alert);
