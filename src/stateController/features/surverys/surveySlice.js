import { createSlice } from "@reduxjs/toolkit"



const initialState= {
    surveys: [],
    // response format = {survey:1, qn1:ans,q2:ans}
    answers: [],
    currentlyActive:-1



}

const surveySlice = createSlice({
    name:'survey',
    initialState,
    reducers:{
        setSurveys:(state, action) => {
            state.surveys = action.payload
        },
        setResponse:(state, action) => {
        
            state.answers = state.answers.concat(action.payload)
            
        },
        setCurrentActive:(state, action) => {
            state.currentlyActive = action.payload
        },
    }
})

const surveyReducer = surveySlice.reducer

const {setSurveys,setResponse,setCurrentActive} =  surveySlice.actions

export { surveyReducer,setSurveys,setResponse,setCurrentActive}