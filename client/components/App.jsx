import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

const clientSocket = io('http://localhost:8080', { path: '/api/result' });

function mapStateToProps(state) {
  return {
    surveys: state.surveys,
    socket: clientSocket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
