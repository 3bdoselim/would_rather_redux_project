import { Switch, Route } from 'react-router';
import Home from './routes/Home'
import AppRoutes from './components/AppRoutes';
import './App.css';
import Questions from './routes/Questions';
import Leaderboard from './routes/Leaderboard';
import CreateQuestion from './routes/CreateQuestion';
import DetailOFQuestion from './routes/DetailOFQuestion';
import {connect} from 'react-redux'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <AppRoutes path='/leaderboard' component={Leaderboard} />
        <AppRoutes path='/questions/add' component={CreateQuestion} />
        <AppRoutes path='/questions/:id' component={DetailOFQuestion} />
        <AppRoutes path='/questions' component={Questions} />
      </Switch>
    </div>
  );
}

export default connect()(App);
