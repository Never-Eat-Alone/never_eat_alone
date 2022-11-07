import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as NeverEatAlone from 'never_eat_alone';
import { DemoApplicationModel } from './demo_application_model';

const model = new DemoApplicationModel();
const ApplicationControllerWithRouting = Router.withRouter(
  NeverEatAlone.ApplicationController);
const ScrollToTopWithRouter = Router.withRouter(NeverEatAlone.ScrollToTop);

ReactDOM.render(
  <Router.HashRouter>
    <ScrollToTopWithRouter />
    <ApplicationControllerWithRouting model={model} />
  </Router.HashRouter>,
  document.getElementById('main'));
