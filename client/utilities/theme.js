import {fade} from 'material-ui/utils/colorManipulator';

export default {
  light: {
    palette: {
      textColor: '#666',
      alternateTextColor: '#FFF',
      canvasColor: '#FFF',
      borderColor: '#EEE',
      primary1Color: '#3498db',
      primary2Color: '#2980b9',
    }
  },
  dark: {
    palette: {
      textColor: '#FFF',
      alternateTextColor: '#FFF',
      canvasColor: '#2980b9',
      borderColor: fade('#FFF', 0.25),
      primary1Color: '#3498db',
      primary2Color: '#2980b9',
      disabledColor: fade('#FFF', 0.75)
    }
  }
};
