import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class MyUploader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('ini props upload images')
    console.log(this.props)
    return (<div className="form-group"> 
    <ImagesUploader images={this.props.image} headers={{
      Authorization : this.props.headers,
      Identity : this.props.identity
    }} label={this.props.label} url = {this.props.url}
      optimisticPreviews max={this.props.size} onLoadEnd = {
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      } inputId="images"
      className={{
        container: 'hai'
      }} /></div>
    );
  }
}

export const MultipleUpload = connect()(MyUploader);
