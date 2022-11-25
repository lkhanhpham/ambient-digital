
import { useLocation } from "react-router-dom";

const NewQuestion = () => {
    const location = useLocation();
    const question_text= location.state.question_text
    const answer_text =location.state.answer_text
    const question_answer2 =location.state.question_answer2
    const question_answer3 =location.state.question_answer3
    const question_answer4 =location.state.question_answer4

    return (
        <div className="container">
            <p>Folgene Daten wurden gespeichert.</p>
            <p>{question_text}</p>
            <p>{answer_text}</p>
            <p>{question_answer2}</p>
            <p>{question_answer3}</p>
            <p>{question_answer4}</p>
            
        </div>
    )
}

export default NewQuestion;