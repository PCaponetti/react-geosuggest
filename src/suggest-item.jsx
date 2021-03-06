import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestItem extends React.Component {
  /**
   * Whether or not the component should update
   * @param {Object} nextProps The new properties
   * @param {Object} nextState The new state
   * @return {Boolean} Update or not?
   */
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * When the suggest item got clicked
   * @param {Event} event The click event
   */
  onClick = event => {
    event.preventDefault();
    this.props.onSelect(this.props.suggest);
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const classes = classnames(
      'geosuggest-item',
      this.props.className,
      {'geosuggest-item--active': this.props.isActive}
    );

    let label = this.props.suggest.label;
    // ONLY do the first matched substring so as to not confuse the user
    if (this.props.suggest.matchedSubstrings && this.props.suggest.matchedSubstrings.length) {
      let matched = this.props.suggest.matchedSubstrings[0];
      label = <span>
        {label.substring(0, matched.offset) }
        <span className="geosuggest-item--matched-substring">
          {label.substring(matched.offset, matched.offset + matched.length) }
        </span>
        {label.substring(matched.offset + matched.length) }
      </span>;
    }

    return <li className={classes}
      style={this.props.style}
      onMouseDown={this.props.onMouseDown}
      onMouseOut={this.props.onMouseOut}
      onClick={this.onClick}>
        {label}
    </li>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};
