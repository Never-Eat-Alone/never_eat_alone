import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as NeverEatAlone from 'never_eat_alone';
import { DemoApplicationModel } from './demo_application_model';

const model = new DemoApplicationModel();
const ApplicationControllerWithRouting = Router.withRouter(
  NeverEatAlone.ApplicationController);

ReactDOM.render(
  <Router.HashRouter>
    <ApplicationControllerWithRouting model={model} />
  </Router.HashRouter>,
  document.getElementById('main'));
