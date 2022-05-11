import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as NeverEatAlone from 'never_eat_alone';
import { componentsList } from './data/component_schemas';
import { ComponentSchema } from './data/schemas';
import { UICatalog } from './ui_catalog';

interface Properties {
  viewport: NeverEatAlone.Viewport;
  components: ComponentSchema[];
}

class App extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <Router.BrowserRouter>
        <UICatalog 
          viewport={this.props.viewport}
          componentList={this.props.components}/>
      </Router.BrowserRouter>);
  }
}

const ResponsivePage = NeverEatAlone.viewportRenderer(App);
ReactDOM.render(<ResponsivePage components={componentsList}/>,
  document.getElementById('main'));
