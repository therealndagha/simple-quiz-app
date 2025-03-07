

const QuestionTile = ({singleQuestion}) =>{
   // console.log(singleQuestion)

    const selectedAnswer = (userSelectedAnswer) =>{
        //console.log(userSelectedAnswer)
        const {correctAnswer} = singleQuestion;
        if(userSelectedAnswer  === correctAnswer ){
             console.log('correct')
        }
        else{
            console.log('incorrect')
        }
    }
     
    return (
        <div className="p-3 m-3 shadow border border-slate-200">
            <h3 className="text-xl">{singleQuestion.questionText}</h3>
             <div className="flex flex-col space-y-4">
                {
                    singleQuestion?.options && singleQuestion?.options?.length > 0 ?  singleQuestion?.options?.map(singleOption => <div key={singleOption} className="hover:bg-slate-50 p-3 m-3" onClick={()=>selectedAnswer(singleOption)} >{singleOption}</div> 
                     ) : null
                }
             </div>
        </div>
    )
}

export default QuestionTile