import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { userLogin } from '../redux/actions/createActions'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Home(props) {
  const { isUserSelected, users, login } = props
  const classes = useStyles();

  let ui = ''
  if (!isUserSelected) {
    ui =
    <div>
        <Card>
          <CardContent>
            <h2>Select a user</h2>
            <FormControl className={classes.formControl}>
              <InputLabel>User Name</InputLabel>
                <Select value=''>
                  {users.map(user => (
                    <MenuItem key={user.id} value={user.id} onClick={() => login(user.id)}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </CardContent>
      </Card>
    </div>
  } else {
    ui = <Redirect to='/questions' />
  }
  return ui
}

const mapStateToProps = ({ users, loggedUser }) => {
  const isUserSelected = loggedUser !== '' && Object.keys(users).includes(loggedUser)

  return {
    isUserSelected,
    users: Object.keys(users).map(userId => ({
      name: users[userId].name,
      id: users[userId].id,
      avatarURL: users[userId].avatarURL
    }))
  }
}

const mapDispatchToProps = (dispatch) => ({
  login(userId) { return dispatch(userLogin(userId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
