import { useState } from 'react';
import './question.css'
import { useEffect } from 'react';
let Question = (props) => {
    let obj = props;
    const [counter , setCounter] = useState(10);
    const [shuffledAnswers , setShuffle] = useState([])

    // Shuffling Answers
   useEffect(() => {
    let shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
     
    let Answers = [obj.correctAnswer , ...obj.incorrectAnswers];
    let  shuffledAnswers = shuffleArray(Answers);
    setShuffle(shuffledAnswers)
   } , [obj.correctAnswer, obj.incorrectAnswers])

    


    // Timer Functionality
    useEffect(() => {
        let  interval = setTimeout(() => {
            if(counter > 0){
                setCounter((prev) => prev-1);
            }
            else{
                clearTimeout(interval);
                // Automatic Change Question when time is over
                obj.changeQuestion((prev) => (prev < 10) ? prev + 1 : "")
                setCounter(10);
            }
        }, 1000);
        return () => {clearTimeout(interval)}
    } , [counter, obj])


    // Go to next Question After clicking any option
    let storingAnswer = (e) => {
        if(obj.correctAnswerList[obj.number -1] === e.target.value){
            obj.correctAnswerCount((prev) => prev+1)
        }
        obj.changeQuestion((prev) =>  prev + 1 )
        setCounter(10);
    }


    return (
        <div className="question-box">
            <h1>Question {obj.number}</h1>
            <p className='question'>{obj.name}</p>
            <ul className="options">
                <li><button onClick={storingAnswer} value={shuffledAnswers[0]}> {shuffledAnswers[0]} </button></li>
                <li><button onClick={storingAnswer} value={shuffledAnswers[1]}> {shuffledAnswers[1]} </button></li>
                <li><button onClick={storingAnswer} value={shuffledAnswers[2]}> {shuffledAnswers[2]} </button></li>
                <li><button onClick={storingAnswer} value={shuffledAnswers[3]}> {shuffledAnswers[3]} </button></li>
                
            </ul>
            <p className='timer'>Time left: {counter} Seconds</p>
            <button onClick={() => {
                obj.changeQuestion((prev) =>  prev + 1 );
                setCounter(10);
            }}>Skip Question</button>
        </div>
    )
}

export default Question;