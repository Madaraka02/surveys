import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentActive, setResponse } from '../stateController/features/surverys/surveySlice';

const Survey = ({survey}) => {
    const [showResponse, setShowResponse] = useState(false)
    const [answer, setAnswer] = useState('')
    const [answers, setAnswers] = useState([])


    console.log('survey',survey)
    const currentActive = useSelector((state) => state.survey.currentlyActive)
    const responses = useSelector((state) => state.survey.answers)

    const dispatch = useDispatch()
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
    //   console.log('currentActive',currentActive)

      const handleSetCurrentActive = (id) => {
        dispatch(setCurrentActive(id))
      }
      const handleRespond = (survey, question, answer) => {
        const payload = {
            survey,
            question,
            answer
        }
        setAnswers([...answers, payload])
        setAnswer('')
        setShowResponse(false)
      }
    //   console.log('anw',answers)
  return (
    <div className='p-4 w-full border rounded-md capitalize flex flex-col gap-1'>
        <div className="flex flex-row items-center justify-between">
        <p>
        {extractData(survey?.question_text)}
        </p>
        <button onClick={() => handleSetCurrentActive(survey?.id)} className='bg-gray-200 text-center py-1 rounded-md px-3'>Respond</button>
        {/* <button onClick={() => setShowResponse(!showResponse)} className='bg-gray-200 text-center py-1 rounded-md px-3'>Respond</button>  */}

        </div>
        {currentActive ===survey?.id && (
            <div className="flex flex-col gap-3">

                {survey?.answer_type === 'SINGLE_LINE_TEXT' && survey?.options.length > 0 ?
                survey?.options?.map((option, index) => (
                    <div key={index} className="flex flex-row items-center gap-1">
                        <input type="checkbox" value={option?.value} className='ro'/>
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

                <button onClick={() =>handleRespond(survey?.id, survey?.question_text, answer)} className='bg-gray-200 text-center px-3 py-1 rounded-md'>Submit</button>
                </div>
            </div>
            
        )
        
        }
    </div>
  )
}

export default Survey