import React from 'react';

class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      focus: props.autoFocus
    };
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.keyAction = this.keyAction.bind(this);
  }

  componentDidUpdate() {
    if (this.state.focus) {
      this.input.focus();
      this.input.select();
    }
  }

  focus() {
    this.setState({ focus: true });
    // see `componentDidMount`
  }

  blur(e) {
    this.setState({
      focus: false,
      value: this.input.value
    });
    this.props.onChange(e);
  }

  keyAction(e) {
    if (e.keyCode === 27) {
      this.setState({ focus: false });
    } else if (e.keyCode === 13) {
      this.blur(e);
    }
  }

  render() {
    let HTML;
    if (this.state.focus) {
      // if the input is being edited
      HTML = (
        <span className="inline-edit">
          <input
            className="inline-edit-input"
            type={this.props.type}
            onBlur={this.blur}
            onKeyDown={this.keyAction}
            onChange={this.change}
            ref={(input) => { this.input = input; }}
            defaultValue={this.state.value}
            step=".01"
            autoFocus={this.props.autoFocus}
          />
        </span>
      );
    } else if (this.state.value !== undefined && this.state.value !== null) {
      HTML = <span onClick={this.focus} className="inline-edit">{this.state.value}</span>;
    } else {
      // otherwise, use placeholder text
      HTML = (
        <span onClick={this.focus} className="inline-edit">
          <span className="placeholder">{this.props.placeholder}</span>
        </span>
      );
    }
    return HTML;
  }
}

InlineEdit.propTypes = {
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  autoFocus: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired
};

InlineEdit.defaultProps = {
  defaultValue: undefined,
  type: 'test',
  placeholder: 'Click to edit',
  autoFocus: false,
};

export default InlineEdit;
