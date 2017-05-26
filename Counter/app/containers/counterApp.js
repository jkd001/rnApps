'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';


// @connect(state => ({
//   state: state.counter

// }))
class CounterApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { state, actions } = this.props;
    return (
        <Counter
            counter={state.count}
            {...actions} />
    );
  }
}

const mapStateToProps=(state)=>{
    return {
        state: state.counter
    }
};

const mapDispatchToProps=(dispatch)=> {
    return {
        actions: bindActionCreators(counterActions,dispatch)
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CounterApp);
