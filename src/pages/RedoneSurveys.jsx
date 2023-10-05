import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurveys } from '../stateController/features/surverys/actions'
import { extracData, extractData, extractDisplay, isQuestionAvailable, updateQuestionInArray } from '../utils'
import { setCurrentActive, setResponse } from '../stateController/features/surverys/surveySlice'

const RedoneSurveys = () => {
    const dispatch= useDispatch()
    const surveys = useSelector((state) => state.survey.surveys)
    const currentActive = useSelector((state) => state.survey.currentlyActive)
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState({})

    const handleSetAnswer = (question,answer) => {
        const payload = {
            question,
            answer
        }
        setAnswer(payload);
    }

    const handleNextQuestion = () => {
        if(isQuestionAvailable(answers,answer?.question)){
            
            updateQuestionInArray(answers,answer)
            setAnswer('')
        }else{
            setAnswers([...answers, answer]);
            setAnswer('')
        }
    }

    const handleSubmitResponses = (survey) => {
        
        const payload = {
            survey,
            responses:answers
        }
        dispatch(setResponse(payload))
        alert('Survey submitted successfully')
    }

    const handleFetchSurverys = async () => {
        await fetchSurveys(dispatch)

    }
    useEffect(() => {
        handleFetchSurverys()
    },[])

    const handleSetCurrentActive = (id) => {
        dispatch(setCurrentActive(id))
      }

  return (
    <div className='container mx-auto flex flex-col gap-3 w-full py-10'>
        <p className='capitalize text-[20px]'>{extracData(surveys?.id)}</p>
        {surveys?.questions?.length > 0 &&
        <div className="">

        <button onClick={() => handleSetCurrentActive(surveys?.questions[0].id)} className='bg-gray-200 text-center py-1 rounded-md px-3'>Respond</button>
        </div>}
        {surveys?.questions?.map((question, index) => (
            <div key={question.id} className="flex flex-col gap-1 border p-3 rounded-md">
                <p onClick={() => isQuestionAvailable(answers,question?.id)&& handleSetCurrentActive(question?.id)}>{extractData(question?.question_text)}</p>
                {currentActive === question?.id &&
                    <div className="flex flex-col gap-3">

                    {question?.answer_type === 'SINGLE_LINE_TEXT' && question?.options.length > 0 ?
                    question?.options?.map((option, index) => (
                        <div key={index} className="flex flex-row items-center gap-1">
                            <input type="radio" name='select' value={option?.value} onChange={(e) => handleSetAnswer(question?.id, e.target.value)}  className=''/>
                            <p> {extractDisplay(option?.display_text)}</p>
                        </div>
                    ))
                    :
                    question?.answer_type === 'SINGLE_LINE_TEXT'?
                    <input type="text" onChange={(e) => handleSetAnswer(question?.id, e.target.value)} className='w-full rounded-md outline-none border  px-2 py-2' />
                    :question?.answer_type === 'FLOAT'?
                    <input type="number" onChange={(e) => handleSetAnswer(question?.id, e.target.value)} className='w-full rounded-md outline-none border px-2 py-2' />
                    :null}

                </div>
                }
                
                {currentActive === question?.id &&
                <div className="flex">
                <button className={`bg-gray-100 px-4 text-center rounded-md py-1`} onClick={() => {
                    handleNextQuestion()
                    handleSetCurrentActive(question?.next)}}>Next</button>
                </div>}
                {!question?.next && answers.length === surveys?.questions?.length &&
                <div className="flex">
                <button className={`bg-gray-100 px-4 text-center rounded-md py-1`} 
                onClick={() => {
                    handleSubmitResponses(surveys?.id)
                    }}>Finish</button>
                </div>}
                
            </div>
        ))}
    </div>
  )
}

export default RedoneSurveys