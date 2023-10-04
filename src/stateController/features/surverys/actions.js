import axios from "axios";
import { setSurveys } from "./surveySlice";


export const fetchSurveys = async (dispatch) => {
    try{
        const response = await axios.get('https://run.mocky.io/v3/d628facc-ec18-431d-a8fc-9c096e00709a')
        // store respomse in state
        // console.log('res',response.data)
        dispatch(setSurveys(response.data))
    }
    catch(error){
        console.error('error',error)
    }
}
