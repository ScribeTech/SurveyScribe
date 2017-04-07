import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Trash from './../assets/TrashCan.png';

const EditSingle = (props) => {
  EditSingle.propTypes = {
    questions: React.PropTypes.object,
  }.isRequired;

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const styles = {
    question: {
      marginLeft: '25px'
    },
    option: {
      marginLeft: '50px'
    },
    trash: {
      marginLeft: '20px'
    }
  };

  return (
    <div>
      <TextField
        id={props.survey.id.toString()}
        defaultValue={props.survey.title}
      />
      {props.questions[props.survey.id].map((question, i) => (
        <div style={styles.question}>
          <span>{`${i + 1}.   `}</span>
          <TextField
            id={props.survey.id.toString()}
            defaultValue={question.label}
          />
          <span>
            <img style={styles.trash} src={Trash} alt="trash" />
          </span>
          {props.options[question.questionId].map((option, j) => (
            <div style={styles.option}>
              <span>{`${alphabet[j]}.   `}</span>
              <TextField
                id={props.survey.id.toString()}
                defaultValue={option.label}
              />
              <span onClick={() => props.removeOption(question.questionId, j)}>
                <img style={styles.trash} src={Trash} alt="trash" />
              </span>
            </div>
          ))}
          <RaisedButton onClick={() => props.addOption(question.questionId, '')} label="Add Choice" style={styles.option} />
        </div>
      ))}
    </div>
  );
};

export default EditSingle;
