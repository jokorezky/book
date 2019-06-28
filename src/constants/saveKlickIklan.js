import React from "react";
import { connect } from "react-redux";
import { saveKlickIklan } from "../redux/modules/AdsReducer";

const saveClickIklan = () => {
  console.log("ini ");
  return class extends React.Component {
    render() {
      return <div />;
    }
  };
};

const mapStateToProps = state => ({
  responseState: state.AdsReducer
});

const saveCount = connect(mapStateToProps)(saveClickIklan);

export default saveClickIklan;
