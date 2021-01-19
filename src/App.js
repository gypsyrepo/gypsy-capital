import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp } from './pages/pages';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
    </div>
  );
}

export default App;
