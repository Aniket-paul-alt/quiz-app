import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from "../../assets/data.js"

const Quiz = () => {
  let randomNumber =()=> Math.floor(Math.random() * (data.length - 0 + 1)) + 0;

  let [index, setIndex] = useState(randomNumber())
  let [quesIndex, setQuesIndex] = useState(1)
  const [question, setQuestion] = useState(data[index])
  const [lock, setLock] = useState(false)
  let [score, setScore] = useState(0)
  let [result, setResult] = useState(false)
  
  // console.log(data.length, randomNumber);
  

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)

  let optionArray = [Option1, Option2, Option3, Option4]

  const checkAns = (elem, ans)=>{
    if(lock === false){
      if(question.ans === ans){
        elem.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev+1)
      }else{
        elem.target.classList.add("wrong")
        setLock(true)
        optionArray[question.ans-1].current.classList.add("correct")
      }
    }
  }

  const next = () =>{
    if(lock === true){
      if(quesIndex === 5){
        setResult(true)
        return 0
      }
      setQuesIndex(++quesIndex)
      setQuestion(data[randomNumber()])
      setLock(false)
      optionArray.map(option => {
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null
      })
    }
  }

  const reset = () =>{
    setIndex(randomNumber())
    setQuesIndex(1)
    setQuestion(data[randomNumber()])
    setScore(0)
    setLock(false)
    setResult(false)
  }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? <>
        <h2>You Scored {score} out of 5</h2>
        <button onClick={reset}>Reset</button>
      </> : <>
      <h2>{quesIndex}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=> checkAns(e,1)}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=> checkAns(e,2)}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=> checkAns(e,3)}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=> checkAns(e,4)}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className='index'>{quesIndex} of 5 quiestions</div>
      </>}
    </div>
  )
}

export default Quiz
