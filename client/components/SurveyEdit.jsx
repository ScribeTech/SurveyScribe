import React from 'react';
import { GridList } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SurveyEditSingle from './SurveyEditSingle';
import Layout from './Layout';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'

  },
  gridList: {
    width: 1000,
    padding: 25
  },
  paper: {
    width: 800,
    margin: 10,
    padding: 15,
    display: 'inline-block'
  },
  actionButton: {
    marginRight: 20
  }
};

const Edit = props => (
  <Layout title="Survey Edit" share="share" save="save">
    <div style={styles.root}>
      <GridList
        cellHeight={'auto'}
        style={styles.gridList}
        padding={8}
        cols={1}
      >
        {props.surveys.map(survey => (
          <Paper key={survey.id} style={styles.paper} zDepth={2}>
            <SurveyEditSingle
              survey={survey}
              questions={props.questions}
              options={props.options}
            />
          </Paper>
        ))}
      </GridList>
      <FloatingActionButton onClick={() => props.addSurvey((props.surveys.length + 1).toString(), '')} className="floatingActionButton" style={styles.actionButton} zDepth={3}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </Layout>
);

Edit.propTypes = {}.isRequired;

export default Edit;
