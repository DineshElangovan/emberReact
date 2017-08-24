import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search} from '../actions';

class SearchBar extends Component {
    constructor(){
        super();
        this.state={
            search:''
        }
    }
    
  render() {
    const {search, value} = this.props;

    return (
        <input
          className="form-control"
          placeholder = "Entername to search"
          onChange={(e) => search(e.target.value)}
          value={value} />
    );
  }
} 

function mapStateToProps({works}) {
  return {value: works};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({search}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);