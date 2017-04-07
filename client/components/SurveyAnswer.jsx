import React from 'react';

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

const Answer = props => (
  <div>
    {props.surveys.map(survey => (
      <div key={survey.id}>
        <h1>{survey.title}</h1>
        {props.questions[survey.id].map((question, i) => (
          <div style={styles.question}>
            <h4>{`${i + 1}. ${question.label}`}</h4>
            {props.options[question.questionId].map((option, j) => (
              <div style={styles.option}>
                {`${alphabet[j]}. ${option.label}`}
              </div>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
);

Answer.propTypes = {}.isRequired;

export default Answer;
