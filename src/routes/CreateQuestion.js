import React from 'react'
import { connect } from 'react-redux'
import { handleCreateQuestion } from '../redux/thunks/questions'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import teal from '@material-ui/core/colors/teal';

const tealColor = teal[500];
const style = {
    background: tealColor,
    color: 'white',
  };
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
function CreateQuestion(props) {
    const classes = useStyles();
    const { userInfo, CreateQuestion } = props

    const submitHandler = (e) => {
        e.preventDefault()
        const o1 = e.target['optionOne'].value
        const o2 = e.target['optionTwo'].value
        CreateQuestion(o1, o2)
        resetForm(e)

    }
    const resetForm = (e) => {
        console.log(e)
        e.target['optionOne'].value = ''
        e.target['optionTwo'].value = ''
    }
    return (
        <div>
            <h2>Hello from Add Question Page for user {userInfo.name}</h2>

            <form onSubmit={submitHandler} className={classes.root}>
                <TextField label="First Option" variant="outlined" type='text' name='optionOne' required />
                <TextField label="Second Option" variant="outlined" type='text' name='optionTwo' required />
                <Button type='submit' variant="contained" style={style} className={classes.root}>
                    Add Question
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ loggedUser, users }) => {
    const userInfo = {
        id: loggedUser,
        name: users[loggedUser].name,
        avatarURL: users[loggedUser].avatarURL
    }
    return { userInfo }
}

const mapDispatchToProps = (dispatch) => ({
    CreateQuestion(o1, o2) { return dispatch(handleCreateQuestion(o1, o2)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)