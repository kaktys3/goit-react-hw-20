import './Feedback.css'
import {useReducer } from 'react'

const Notification = ({ message }) => {
    return (
        <>
            <p className='feedback-stars'>{message}</p>
        </>
    )
}

const Statistics = ({ good, neutral, bad, total, positivePercentage, }) => {
    return (
        <>
            <div className="feedback-statistics">
                <h1>Statistics</h1>
                <p className='feedback-stars'>Good {good}</p>
                <p className='feedback-stars'>Neurtal {neutral}</p>
                <p className='feedback-stars'>Bad {bad}</p>
                <p className='feedback-stars'>Total {total}</p>
                <p className='feedback-stars'>Positive {positivePercentage}%</p>
            </div></>
    )
}

const FeedbackOptions = ({ options }) => {
    return (
        <>
            <button onClick={() => options.option()} className="feedback-button">{options.name}</button>
        </>
    )
}

const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'good':
            return {
                ...state,
                good: state.good + 1
            }

        case 'neutral':
            return {
                ...state,
                neutral: state.neutral + 1
            }

        case 'bad':
            return {
                ...state,
                bad: state.bad + 1
            }

        default: throw new Error();
    }
}

export function Feedback() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const TotalFeedback = state.bad + state.neutral + state.good

    let PositivePercentage = ''
    if (TotalFeedback) {
        PositivePercentage = state.good / TotalFeedback * 100
    }
    
    const optionsArr = [
        { name: 'Good', option: () => dispatch({ type: 'good' }) },
        { name: 'Neutral', option: () => dispatch({ type: 'neutral' }) },
        { name: 'Bad', option: () => dispatch({ type: 'bad' }) }
    ];


    return (
        <>
            <div className="feedback-button-box">
                {optionsArr.map((e, index) => (
                    <FeedbackOptions key={index} options={e} />
                ))}
            </div>

            {TotalFeedback === 0 ? <Notification message={"There is no feedback"} /> : <Statistics good={state.good} neutral={state.neutral} bad={state.bad} total={TotalFeedback} positivePercentage={PositivePercentage} />}
        </>
    )
}

export const Section = ({ title, children }) => {
    return (
        <>
            <div className="feedback-console">
                <h1>{title}</h1>
                {children}
            </div>
        </>
    )
}