import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

class Link extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        href={this.props.href}
        onClick={(e) => {
          e.preventDefault();
          this.props.push(this.props.href);
        }}
        {...this.props}
      >
        {this.props.children}
      </a>
    );
  }
}

export default connect(null, { push })(Link);
