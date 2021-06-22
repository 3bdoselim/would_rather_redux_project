import React from 'react'
import { connect } from 'react-redux'
import { answerQuestion } from '../redux/actions/createActions'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
function DetailOFQuestion(props) {
    const classes = useStyles()
    const { isPresent, userInfo, question, onAnswer } = props

    const answerHandler = (selectedOption) => {
        onAnswer(question.id, userInfo.id, selectedOption)
    }

    let ui = null
    if (isPresent) {
        ui = (
            <div>
                <h4>{question.author.name}'s Question</h4>
                <p className={classes.root}>
                    Would you rather {' '}
                    <Button variant="contained"
                        color="primary"
                        className={classes.root}
                        disabled={question.answerState !== 0}
                        onClick={e => answerHandler('optionOne')}
                    >
                        {question.optionOne.text}
                        &nbsp;
                        {
                            question.answerState !== 0
                            && <code>{question.answerStatitistics.optionOne}%</code>
                        }
                    </Button>
                    {' '}or{' '}
                    <Button variant="contained"
                        color="primary"
                        className={classes.root}
                        disabled={question.answerState !== 0}
                        onClick={e => answerHandler('optionTwo')}
                    >
                        {question.optionTwo.text}
                        &nbsp;
                        {
                            question.answerState !== 0
                            && <code>{question.answerStatitistics.optionTwo}%</code>
                        }
                    </Button>
                </p>
            </div>
        )
    } else {
        ui = <div>Question not found</div>
    }

    return (
        <div>
            Hello from DetailOFQuestion Page for user {userInfo.name}
            {'\n'}
            {ui}
        </div>
    )
}

const mapStateToProps = ({ users, questions, loggedUser }, { match: { params } }) => {
    const userInfo = {
        id: loggedUser,
        name: users[loggedUser].name,
        avatarURL: users[loggedUser].avatarURL
    }

    const questionId = params.id

    const question = {
        id: '',
        optionOne: { text: '' },
        optionTwo: { text: '' },
        answerState: 0,
        answerStatitistics: {
            optionOne: 0,
            optionTwo: 0
        },
        author: {
            name: '',
            avatarURL: '',
            id: ''
        }
    }

    const isPresent = Object.keys(questions).includes(questionId)

    if (isPresent) {
        const questionItem = questions[questionId]
        question.id = questionId
        question.optionOne.text = questionItem.optionOne.text
        question.optionTwo.text = questionItem.optionTwo.text

        switch (users[loggedUser].answers[questionId]) {
            case 'optionOne':
                question.answerState = 1
                break;
            case 'optionTwo':
                question.answerState = 2
                break;
            default:
                question.answerState = 0
        }

        const optionOneAnswers = questions[questionId].optionOne.votes.length
        const optionTwoAnswers = questions[questionId].optionTwo.votes.length
        const total = optionOneAnswers + optionTwoAnswers

        question.answerStatitistics.optionOne = (100 * optionOneAnswers / total).toFixed(2);
        question.answerStatitistics.optionTwo = (100 * optionTwoAnswers / total).toFixed(2);

        question.author.id = users[questions[questionId].author].id
        question.author.name = users[questions[questionId].author].name
        question.author.avatarURL = users[questions[questionId].author].avatarURL

    }


    return { userInfo, question, isPresent }
}

const mapDispatchToProps = (dispatch) => ({
    onAnswer(questionId, userId, selectedOption) {
        return dispatch(answerQuestion(questionId, userId, selectedOption))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailOFQuestion)