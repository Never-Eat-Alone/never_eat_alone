import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withRouter, BrowserRouter } from 'react-router-dom';
import * as NeverEatAlone from 'never_eat_alone';

const model = new NeverEatAlone.HttpApplicationModel();
const ApplicationControllerWithRouting = withRouter(
  NeverEatAlone.ApplicationController);
const ScrollToTopWithRouter = withRouter(NeverEatAlone.ScrollToTop);
ReactDOM.render(
  <BrowserRouter>
    <ScrollToTopWithRouter>
      <ApplicationControllerWithRouting model={model} />
    </ScrollToTopWithRouter>
  </BrowserRouter>,
  document.getElementById('main'));
