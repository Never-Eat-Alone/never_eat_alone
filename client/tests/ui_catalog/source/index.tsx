import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as NeverEatAlone from 'never_eat_alone';
import { loadComponentSchemas } from './data/component_schemas';
import { ComponentSchema } from './data/schemas';
import { UICatalog } from './ui_catalog';

interface Properties {
  components: ComponentSchema[];
}

class App extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <Router.BrowserRouter>
        <UICatalog
          componentList={this.props.components}/>
      </Router.BrowserRouter>);
  }
}

ReactDOM.render(<App components={loadComponentSchemas()}/>,
  document.getElementById('main'));
