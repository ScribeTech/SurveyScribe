/*
 * This script adds the Roboto font to our project.
 * For more detail go to this site:
 * http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500
 */
global.WebFontConfig = {
  google: { families: ['Roboto:400,300,500:latin'] }
};
(function () {
  const wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
}());
