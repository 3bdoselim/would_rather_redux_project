import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStylesGrid = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      margin: '20px'
    },
    gridList: {
      width: 400,
      height: 200,
      padding: '5px',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    card: {
        border: '1px solid #e0e0e0',
    }
  }));
function Leaderboard(props) {
    const { leaderboard } = props
    const classesGrid = useStylesGrid();

    return (
        <div className={classesGrid.root}>
        <GridList cellHeight={80} className={classesGrid.gridList}>
          {leaderboard.map((item) => (
            <GridListTile key={item.id} className={classesGrid.card}>
                <p>
                    <b>{item.name}</b>
                </p>
                <p>Score: {item.score}</p>
            </GridListTile>
          ))}
        </GridList>
        </div>
    )
}

const mapStateToProps = ({ users, questions, loggedUser }) => {
    const leaderboard = Object.keys(users).map(userId => {
        const name = users[userId].name
        const id = users[userId].id
        const avatarURL = users[userId].avatarURL

        const answers = Object.keys(users[userId].answers).length
        const questions = users[userId].questions.length
        const score = answers + questions

        return { name, id, avatarURL, score }
    }).sort((a, b) => b.score - a.score)

    const userInfo = {
        id: loggedUser,
        name: users[loggedUser].name,
        avatarURL: users[loggedUser].avatarURL
    }

    return {
        leaderboard,
        userInfo
    }
}

export default connect(mapStateToProps)(Leaderboard)
