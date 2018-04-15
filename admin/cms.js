/* eslint-disable no-unused-vars */
/* eslint-env browser */
import { youtube } from './editors';
import * as Material from './widgets/material-design-icon';
import * as fa from './widgets/fontawesome';

const cms = CMS || windwo.CMS;
if (cms) {
  cms.registerEditorComponent(youtube);
  cms.registerWidget('icon', Material.Control);
  cms.registerWidget('fontawesome', fa.Control);
}