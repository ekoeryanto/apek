import CMS from 'netlify-cms';

import 'netlify-cms/dist/cms.css';

import { youtube } from './editors';
import * as Material from './widgets/material-design-icon';
import * as fa from './widgets/fontawesome';
import * as color from './widgets/color';

window.CMS = CMS;

CMS.registerEditorComponent(youtube);
CMS.registerWidget('icon', Material.Control);
CMS.registerWidget('fontawesome', fa.Control);
CMS.registerWidget('color', color.Control);