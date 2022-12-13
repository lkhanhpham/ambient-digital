import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnswerField from '../components/AnswerField';

// For each created quiz one quizcard is rendered
const QuestionShow = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const WholeQuestion = location.state.question
    const points=location.state.points
    const categorie =location.state.categorie
    var arr=[]
    arr[0]=WholeQuestion.default_answer
    if (WholeQuestion.question_type==="MC"){
        arr[1]=WholeQuestion.question_answer_option[0]
        arr[2]=WholeQuestion.question_answer_option[1]
        arr[3]=WholeQuestion.question_answer_option[2]
    }
    arr=shuffle(arr);
    //ausbaufähig
    function shuffle(array){
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

        return array;
    }
    
    console.log(arr)
    function multipleChoice(){
        if (arr.length>1){
            return true;
        }
        else{
            return false;
        }
    }
    
    const eventListener = async () => {
    var answer = document.getElementsByClassName('AnswerOption');
    console.log(answer)
    console.log(answer[0])
    var button =document.getElementById("button");
    button.addEventListener('click', function () {
        if(WholeQuestion.question_type!=="MC"){
           // var scanswer= <><AnswerField key={arr[0].id} answer={arr[0].text}/></>;
          //  console.log(scanswer)
            var div=document.getElementById("singlechoice")
          //  div.after(scanswer)
          let hidden=div.getAttribute("hidden")
          console.log(hidden)//log muss bleiben
          if (hidden) {
            div.removeAttribute("hidden");
         } else {
            div.setAttribute("hidden", "hidden");
         }
        }
        else{
        for (var i=0;i<answer.length;i++){
            if(arr[i].is_correct===true){
            answer[i].style.backgroundColor = 'green';
        }
            else{
                answer[i].style.backgroundColor = 'red';
            }
        }
    }
    });
    }
    useEffect(
        () => {
            eventListener();
        }, []
    )
    return (
        <div className="container">
            <p style={{textAlign: "center",fontSize:'20px', fontWeight:"bold",overflowWrap: 'break-word',margin:"20px"}}>Categorie {categorie} for {points} points!</p>
            <p style={{textAlign: "center",fontSize:'20px', fontWeight:"bold",overflowWrap: 'break-word',margin:"40px"}}>{WholeQuestion.question_text}</p>
            <div className='d-flex justify-content-center'>
                    {multipleChoice() ?(
                <div className='d-flex w-100'>
                {arr.map((item) => (
                    <AnswerField
                        key={item.id}
                        answer={item.text}
                        correct={item.is_correct}
                        className="AnswerOption"
                        
                    />
                ))}
                </div>):(<div id='singlechoice' hidden="hidden">
                <AnswerField
                        key={arr[0].id}
                        answer={arr[0].text}
                        correct={arr[0].is_correct}
                        
                    />
                </div>
                )}
            </div>
            <div>
            <button className="btn btn-secondary my-4 btn-lg w-100" id="button"> Show Solution</button>
            </div>
            <div class="d-flex justify-content-center">
            <button className="btn btn-secondary my-4 btn-lg" onClick={() => navigate(-1)}> Back to Quiz</button>
            </div>
            
        </div> 
    )
}

export default QuestionShow;