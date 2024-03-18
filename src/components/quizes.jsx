import { useEffect, useState } from 'react';
import Question from './questions/question';
import './quizes.css'
let Quiz = () => {
    const [Data , setData] = useState([]);
    const [index , setIndex] = useState(0);
    const [correctAns , setCorrect] = useState([])
    const [countCorrectAnswer , setCountCorrectAnswer] = useState(0);
    const correct_Answers = [];
    let fetching = () => {
        fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
        .then((response) => response.json())
        .then((response) => setData(response.results))
        .catch((e) => console.log(e.message)) 
    }

    useEffect(() => {
        fetching();
    } , [] )

   
    let correctAnswers = () => {
        if(Data && Data.length != 0){
            Data.map((element) => {
                correct_Answers.push(element.correct_answer)
            })
            setCorrect([...correct_Answers])
        }
    }

    useEffect(() => {
        correctAnswers();
    } , [Data])

    
    return (
        <div className="container">
            <h1 className='heading'>Quiz App</h1>
            {
               (index > 9) ? <p>Quiz Results:  {countCorrectAnswer} / 10 </p>  : (!Data || Data.length == 0) ? (<p>Fetching Data Please Wait !!</p>) : (<Question 
                name = {Data[index].question}
                number = {index + 1}
                changeQuestion = {setIndex}
                correctAnswer = {Data[index].correct_answer}
                incorrectAnswers = {Data[index].incorrect_answers}
                correctAnswerCount = {setCountCorrectAnswer}
                correctAnswerList = {correctAns}
                
                />)
                    
                
            }
        </div>
    )
}

export default Quiz;