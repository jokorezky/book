import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router";
import { Container, Form, Button } from "reactstrap";
import { addFeedback } from "../../redux/modules/FeedbacksReducer";
import {
  TextInput,
  Autocomplete,
  SelectBox,
  RatingInput
} from "../../helpers/inputform";
import { required, minLength2, email } from "../../helpers/validations";
const form = reduxForm({ form: "AddSubCategory" });
import Alert from "react-s-alert";
import styles from "./App.css";
const categories = [
  {
    name: "Business",
    value: "business"
  },
  {
    name: "Technology",
    value: "technology"
  },
  {
    name: "Art",
    value: "art"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem(item, isHighlighted) {
    return (
      <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
        {item.label}
      </div>
    );
  }
  handleFormSubmit = values => {
    console.log(values);
    const { dispatch } = this.props;
    return dispatch(addFeedback(values))
      .then(response => {
        if (response !== undefined) {
          console.log(response);
        } else {
          console.log("ini error undefined");
        }
      })
      .catch(error => {
        console.log(error);
        console.log("tidak masuk");
      });
  };

  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      errors,
      message,
      loading
    } = this.props;

    return (
      <Container className={styles.App}>
        <div className={styles.headingBx}>
          <h2 className={styles.titleHead}>
            <span className={styles.boldText}>Send </span>Feedback
          </h2>
        </div>
        <Form
          className={styles.form}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <Field
            name="name"
            type="search"
            component={Autocomplete}
            label="Book Name"
            suggestions={[
              "Start With Why",
              "Start to Lead",
              "Start Simple Idea",
              "Start Crushing It!"
            ]}
            placeholder=""
            validate={[required]}
          />

          <Field
            name="bookCategory"
            type="select"
            data={categories}
            component={SelectBox}
            label="Book Category"
            validate={[required]}
          />
          <Field
            name="rating"
            type="email"
            component={RatingInput}
            label="Book Rating"
            placeholder=""
            validate={[required]}
          />
          <Field
            name="contactEmail"
            type="email"
            component={TextInput}
            label="Contact Email"
            placeholder=""
            validate={[required, email]}
          />

          <Button color="danger" size="lg">
            Submit
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className={styles.ml10}
            size="lg"
          >
            Reset
          </Button>
        </Form>
      </Container>
    );
  }
}
export default withRouter(connect(null)(form(App)));
