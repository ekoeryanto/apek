/* eslint-disable no-unused-vars */
/* eslint-env browser */
import 'netlify-cms/dist/cms.css';
import CMS from 'netlify-cms';
import netlifyIdentityWidget from 'netlify-identity-widget';

import { youtube } from './editors'
import * as Material from './widgets/material-design-icon'
import * as fa from './widgets/fontawesome'

CMS.registerEditorComponent(youtube)
CMS.registerWidget('icon', Material.Control);
CMS.registerWidget('fontawesome', fa.Control);

window.netlifyIdentity = netlifyIdentityWidget;
netlifyIdentityWidget.init();