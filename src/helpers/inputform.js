import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import styles from "./helpers.css";

export const TextInput = ({
  input,
  label,
  subtitle,
  placeholder,
  labelcol,
  divcol,
  formgrouprow,
  disabled,
  type,
  id,
  renderItem,
  meta: { touched, error, warning }
}) => (
  <div className={"form-group " + formgrouprow}>
    {label != "" && (
      <label className={"col-form-label " + labelcol} htmlFor={id}>
        {label}
      </label>
    )}

    {subtitle ? (
      <span>
        <small
          style={{
            color: "#969393d1"
          }}
        >
          {subtitle}
        </small>
      </span>
    ) : (
      ""
    )}
    <div className={divcol + " " + type}>
      <input
        {...input}
        id={id}
        className="form-control form-control-lg"
        disabled={disabled}
        placeholder={placeholder}
        type={type}
      />{" "}
      {touched &&
        ((error && (
          <span className={styles.errortext}>{`${label} ${error}`}</span>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class Rating extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { input } = this.props;
    return (
      <div className="form-group" style={{ marginBottom: -15 }}>
        <div className={this.props.formgrouprow}>
          <div className={this.props.labelcol}>
            <label className="field-label" htmlFor={this.props.id}>
              {this.props.label}
            </label>
          </div>
          <div className={this.props.divcol}>
            <div className={this.props.type}>
              <StarRatingComponent
                starCount={10}
                value={this.props.input.value ? this.props.input.value : 0}
                renderStarIcon={() => (
                  <span style={{ fontSize: 30, paddingRight: 10 }}>★</span>
                )}
                onStarClick={event => {
                  input.onChange(event);
                }}
              />

              {this.props.meta.touched &&
                ((this.props.meta.error && (
                  <div style={{ marginTop: -21, marginBottom: 15 }}>
                    <span className={styles.errortext}>{`${this.props.label} ${
                      this.props.meta.error
                    }`}</span>
                  </div>
                )) ||
                  (this.props.meta.warning && (
                    <div style={{ marginTop: -21, marginBottom: 15 }}>
                      <span>{this.props.meta.warning}</span>
                    </div>
                  )))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SelectComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { input } = this.props;
    return (
      <div className="form-group">
        <div className={this.props.formgrouprow}>
          <div className={this.props.labelcol}>
            <label className="field-label" htmlFor={this.props.id}>
              {this.props.label}
            </label>
          </div>
          <div className={this.props.divcol}>
            <div className={this.props.type}>
              <select
                id={this.props.id}
                disabled={this.props.disabled}
                className={`form-control-lg form-control`}
                type={this.props.type}
                value={this.props.input.value ? this.props.input.value : 1}
                onChange={event => {
                  input.onChange(event);
                }}
              >
                <option disabled="disabled" selected value="">
                  Select {this.props.label}
                </option>
                {this.props &&
                  this.props.data &&
                  this.props.data.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.name}
                    </option>
                  ))}
              </select>
              {this.props.meta.touched &&
                ((this.props.meta.error && (
                  <span className={styles.errortext}>{`${this.props.label} ${
                    this.props.meta.error
                  }`}</span>
                )) ||
                  (this.props.meta.warning && (
                    <span>{this.props.meta.warning}</span>
                  )))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AutocompleteComponent extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions, input } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    input.onChange(e);
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = styles.suggestionActive;
              }

              return (
                <li
                  className={styles.suggestionActive}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <div class="form-group undefined">
          <label class="col-form-label undefined">Book Name</label>
          <div class="undefined email">
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
            <div style={{ position: "relative", width: "100%" }}>
              {suggestionsListComponent}
            </div>
          </div>
        </div>

        {this.props.meta.touched &&
          ((this.props.meta.error && (
            <div style={{ marginTop: -16, marginBottom: 15 }}>
              <span className={styles.errortext}>{`${this.props.label} ${
                this.props.meta.error
              }`}</span>
            </div>
          )) ||
            (this.props.meta.warning && (
              <div style={{ marginTop: -21, marginBottom: 15 }}>
                <span>{this.props.meta.warning}</span>
              </div>
            )))}
      </Fragment>
    );
  }
}

export const SelectBox = connect()(SelectComponent);
export const RatingInput = connect()(Rating);
export const Autocomplete = connect()(AutocompleteComponent);
