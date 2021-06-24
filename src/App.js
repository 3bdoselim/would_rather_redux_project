import { Switch, Route } from 'react-router';
import Home from './routes/Home'
import AppRoutes from './components/AppRoutes';
import './App.css';
import { NavLink } from 'react-router-dom';
import Questions from './routes/Questions';
import Leaderboard from './routes/Leaderboard';
import CreateQuestion from './routes/CreateQuestion';
import DetailOFQuestion from './routes/DetailOFQuestion';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

const removeLinkDecoration = {
  textDecoration: 'none',
};

const NoMatch = ({location}) => (
  <div>
    <h3>Error 404 not found</h3>
    <NavLink to='/' style={removeLinkDecoration}>
      <Button variant="contained" color="primary">Home</Button>
    </NavLink>
  </div>
)
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <AppRoutes exact path='/leaderboard' component={Leaderboard} />
        <AppRoutes exact path='/questions/add' component={CreateQuestion} />
        <AppRoutes  path='/questions/:id' component={DetailOFQuestion} />
        <AppRoutes exact path='/questions' component={Questions} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default connect()(App);
