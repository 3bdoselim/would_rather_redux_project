import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Chip from '@material-ui/core/Chip';

const removeLinkDecoration = {
  textDecoration: 'none',
};
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const useStylesGrid = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
function Questions(props) {
  const classes = useStyles();
  const classesGrid = useStylesGrid();
  const { questions } = props

  return (
    <div>
      <h2>Questions</h2>
      <div className={classes.root}>
        <NavLink to='/questions?filter=answered' style={removeLinkDecoration}>
          <Button color="secondary">Answered</Button>
        </NavLink>
        <NavLink to='/questions?filter=unanswered' style={removeLinkDecoration}>
          <Button color="secondary">Unanswered</Button>
        </NavLink>
        <NavLink to='/questions?filter=all' style={removeLinkDecoration}>
          <Button color="secondary">All</Button>
        </NavLink>
      </div>
      <div className={classesGrid.root}>
      <GridList cellHeight={180} className={classesGrid.gridList}>
        {questions.map((question) => (
          <GridListTile key={question.id}>
              <h4>{question.author.name}'s Question</h4>
              <p>
                Would you rather {' '}
                <br/>
                <br/>
                <Chip label={question.optionOne.text}/>
                {' '}or{' '}
                <Chip label={question.optionTwo.text}/>
              </p>
              <Link to={`/questions/${question.id}`} style={removeLinkDecoration}>
                <Button color="primary" variant="contained">Poll</Button>
              </Link>
          </GridListTile>
        ))}
      </GridList>
      </div>
    </div>
  )
}

const mapStateToProps = ({ users, questions, loggedUser }, { location }) => {
  const filter = new URLSearchParams(location.search).get('filter')
  console.log('filter: ', filter)

  const questionList = Object.keys(questions).filter(questionId => {
    if (filter === 'answered') {
      return Object.keys(users[loggedUser].answers).includes(questionId)
    }
    if (filter === 'unanswered') {
      return !Object.keys(users[loggedUser].answers).includes(questionId)
    }
    return true
  })
    .map(questionId => {
      const id = questionId
      const optionOne = { text: questions[questionId].optionOne.text }
      const optionTwo = { text: questions[questionId].optionTwo.text }
      const timestamp = questions[questionId].timestamp

      const author = {}
      author.name = users[questions[questionId].author].name
      author.avatarURL = users[questions[questionId].author].avatarURL

      return { id, optionOne, optionTwo, timestamp, author }
    })
    .sort((a, b) => b.timestamp - a.timestamp)

  const userInfo = {
    id: loggedUser,
    name: users[loggedUser].name,
    avatarURL: users[loggedUser].avatarURL
  }

  return { questions: questionList, userInfo }
}

export default connect(mapStateToProps)(Questions)