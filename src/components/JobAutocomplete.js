import React from "react";

export default class JobAutocomplete extends React.Component {
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
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // Event fired when the input value is changed
  onChange(e) {
    const { suggestions } = this.props;
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
  }

  onClick(e) {
    // Update the user input and reset the rest of the state
    this.props.getData(e.currentTarget.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  }

  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.props.getData(filteredSuggestions[activeSuggestion]);
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
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
  }

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
          <ul className="suggestions">
            {filteredSuggestions
              .sort(function(a, b) {
                let startsWith = new RegExp("^" + userInput, "i");
                if (a.match(startsWith)) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, try a different title!</em>
          </div>
        );
      }
    }

    return (
      <div className="form-group autocomplete-wrapper">
        <label className="label-hidden">Job Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Job title"
          id="autocomplete"
          onChange={onChange}
          autoComplete="off"
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </div>
    );
  }
}
