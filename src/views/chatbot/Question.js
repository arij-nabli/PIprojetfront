import React from 'react';


const Question = (props) => {
    return (
        <div className="text-center my-6 text-sm font-bold" style={{ color: '#BD2C43' }}>
   <h1>{props.question}</h1>
        </div>
     
    );
}

export default Question;