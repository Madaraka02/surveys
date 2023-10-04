import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const Responses = () => {
    const answers = useSelector((state) => state.survey.answers)
    console.log('answers',answers)
    
  return (
    <>
    <Header/>
    <div className='flex flex-col w-full '>
        <div className="container mx-auto py-20 w-full flex flex-col gap-2">
            {answers?.map((answer)=> (
                <div className="flex flex-col border rounded-md p-3 gap-1">
                    <p>Survery : {answer?.survey}</p>
                    <p>Question : {answer?.question}</p>
                    <p>Answer : {answer?.answer}</p>


                </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default Responses