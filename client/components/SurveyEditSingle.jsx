import React from 'react';
import TextField from 'material-ui/TextField';

const EditSingle = (props) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const styles = {
    question: {
      'margin-left': '25px'

    },
    option: {
      'margin-left': '50px'
    }
  };

  return (
    <div>
      <TextField
        id={props.survey.id.toString()}
        defaultValue={props.survey.title}
      />
      {props.questions[props.survey.id].map((question, i) => (
        <div>
          <TextField
            id={props.survey.id.toString()}
            defaultValue={i + 1 + '.   ' + question.label}
            style={styles.question}
          />
          
          {props.options[0][question.id].map((option, j) => (
            <div>
              <TextField
                id={props.survey.id.toString()}
                defaultValue={alphabet[j] + '.   ' + option}
                style={styles.option}
              />
            </div>
          ))}
        </div>
      ))}
    </div> 
  );
};

export default EditSingle;
