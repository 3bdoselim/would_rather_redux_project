import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { NavLink } from 'react-router-dom'
import { handleUserLogout } from '../redux/thunks/loggedUser'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
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
function AppRoutes(props) {
    const classes = useStyles();
    const { loggedUser, userIds, allUsers, logout, ...restProps } = props

    if (userIds.find(id => id === loggedUser)) {
        return <div className={classes.root}>
            <Chip
                label={allUsers[loggedUser].name}
                avatar={<Avatar>{allUsers[loggedUser].name[0]}</Avatar>}
            />
            <Button variant="contained" color="secondary"
                onClick={logout}
            >
                Logout
            </Button>
            <div className={classes.root}>
                <NavLink to='/questions' style={removeLinkDecoration}>
                    <Button color="primary">Questions</Button>
                </NavLink>
                <NavLink to='/questions/add' style={removeLinkDecoration}>
                    <Button color="primary">Add Question</Button>
                </NavLink>
                <NavLink to='/leaderboard' style={removeLinkDecoration}>
                    <Button color="primary">Leaderboard</Button>
                </NavLink>
            </div>
            <Route {...restProps} />
        </div>
    } else {
        return <Redirect to='/' />
    }
}

const mapStateToProps = state => ({
    loggedUser: state.loggedUser,
    userIds: Object.keys(state.users),
    allUsers: state.users
})

const mapDispatchToProps = (dispatch) => ({
    logout() { return dispatch(handleUserLogout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes)