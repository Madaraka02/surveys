export const extractData = (inputString) => {
    const parts = inputString?.split('_');
    if (parts?.length >= 3 && parts[0] === 'q') {
      parts.shift(); // Remove the 'q' prefix
      return parts?.join(' ');
    } else {
      return 'Invalid input';
    }
  };
  export const extractDisplay = (inputString) => {
    const parts = inputString?.split('_');
    if (parts?.length >= 2 && parts[0] === 'opt') {
      parts.shift(); // Remove the 'q' prefix
      return parts?.join(' ');
    } else {
      return 'Invalid input';
    }
  };

  export const extracData = (inputString) => {
    const parts = inputString?.split('_');
      
      return parts?.join(' ');
  };
  export function isQuestionAvailable(questionArray, targetQuestion) {
    for (let i = 0; i < questionArray.length; i++) {
      if (questionArray[i].question === targetQuestion) {
        return true; 
      }
    }
    return false; 
  }  

 export function updateQuestionInArray(questionArray, updatedQuestion) {
    for (let i = 0; i < questionArray.length; i++) {
      if (questionArray[i].question === updatedQuestion.question) {
        questionArray[i] = updatedQuestion; // Replace the object with the updatedQuestion
        return;
      }
    }
  } 