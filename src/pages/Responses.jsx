import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { extracData, extractData } from '../utils'

const Responses = () => {
    const answers = useSelector((state) => state.survey.answers)
    console.log('answers',answers)
    
  return (
    <>
    <Header/>
    <div className='flex flex-col w-full px-2'>
        <div className="container mx-auto py-20 w-full flex flex-col gap-2">
            {answers?.map((answer)=> (
                <div className="flex flex-col border rounded-md p-3 gap-1">
                    <p className='font-semibold text-[20px] uppercase'>Survery : {extracData(answer?.survey)}</p>
                    {answer?.responses?.map((resp) => (

                    <div className="flex flex-col ">
                    <p className='capitalize font-medium text-[16px] text-gray-600'>Qn : {extractData(resp?.question)}</p>
                    <p className='capitalize font-medium text-[16px] text-gray-600'>Ans : {resp?.answer}</p>
                    </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default Responses