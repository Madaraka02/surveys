import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurveys } from '../stateController/features/surverys/actions'
import Survey from '../components/Survey'
import { setCurrentActive, setResponse } from '../stateController/features/surverys/surveySlice'

const Surveys = () => {
    const surveys = useSelector((state) => state.survey.surveys)
    const [showResponse, setShowResponse] = useState(false)
    const [answer, setAnswer] = useState('')
    const [answers, setAnswers] = useState([])
    const [nextIndex, setNextIndex] = useState()


    const dispatch= useDispatch()
    const handleFetchSurverys = async () => {
        await fetchSurveys(dispatch)

    }
    useEffect(() => {
        handleFetchSurverys()
    },[])





    const currentActive = useSelector((state) => state.survey.currentlyActive)
    const responses = useSelector((state) => state.survey.answers)

   
    const extractData = (inputString) => {
        const parts = inputString.split('_');
        if (parts.length >= 3 && parts[0] === 'q') {
          parts.shift(); // Remove the 'q' prefix
          return parts.join(' ');
        } else {
          return 'Invalid input';
        }
      };
      const extractDisplay = (inputString) => {
        const parts = inputString.split('_');
        if (parts.length >= 2 && parts[0] === 'opt') {
          parts.shift(); // Remove the 'q' prefix
          return parts.join(' ');
        } else {
          return 'Invalid input';
        }
      };


      const handleSetCurrentActive = (id) => {
        dispatch(setCurrentActive(id))
      }
      const handleRespond = (survey, question, answer,next) => {
        const payload = {
            survey,
            question,
            answer
        }
        setAnswers([...answers, payload])
        dispatch(setCurrentActive(next))

        setAnswer('')
        setShowResponse(false)

      }
      const handleFinishSurvey = () => {
        dispatch(setResponse(answers))
        alert('Survey submitted successfully')
      }
  return (
    <div className='container mx-auto w-full flex flex-col gap-4 px-2 py-20'>
        <p className='font-bold'>Survey questions</p>
        {surveys?.questions?.length > 0 &&
        <div className="">

        <button onClick={() => handleSetCurrentActive(surveys?.questions[0].id)} className='bg-gray-200 text-center py-1 rounded-md px-3'>Respond</button>
        </div>}

        {surveys?.questions?.map((survey, index) => (
                <div key={index} className='p-4 w-full border rounded-md capitalize flex flex-col gap-1'>
                <div className="flex flex-row items-center justify-between">
                <p>
                {extractData(survey?.question_text)}
                </p>

                </div>
                {currentActive ===survey?.id && (
                    <div className="flex flex-col gap-3">
        
                        {survey?.answer_type === 'SINGLE_LINE_TEXT' && survey?.options.length > 0 ?
                        survey?.options?.map((option, index) => (
                            <div key={index} className="flex flex-row items-center gap-1">
                                <input type="checkbox" value={option?.value} onChange={(e) => setAnswer(e.target.value)}  className='ro'/>
                                <p> {extractDisplay(option?.display_text)}</p>
                            </div>
                        ))
                        :
                        survey?.answer_type === 'SINGLE_LINE_TEXT'?
                        <input type="text" onChange={(e) => setAnswer(e.target.value)} className='w-full rounded-md outline-none border  px-2 py-2' />
                        :survey?.answer_type === 'FLOAT'?
                        <input type="number" onChange={(e) => setAnswer(e.target.value)} className='w-full rounded-md outline-none border px-2 py-2' />
                        :null}
                        <div className="">
                            
                        <button onClick={() =>{
                            handleRespond(survey?.id, survey?.question_text, answer)
                            handleSetCurrentActive(surveys?.questions[index+1]?.id)
                            }
                            } className='bg-gray-200 text-center px-3 py-1 rounded-md'>Next</button>
                        </div>
                    </div>
                    
                )
                
                }
            </div>
        ))}
        {answers?.length === surveys?.questions?.length && 
        <div className="">

            <button className='bg-gray-200 text-center px-3 py-1 rounded-md' onClick={handleFinishSurvey}>Finish</button>
        </div>
        }
    </div>
  )
}

export default Surveys