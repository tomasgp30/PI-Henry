import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './componentes/LandingPage/LandingPage'
import Home from './componentes/Home/Home'
import CreateGame from './componentes/Form/CreateGame'
import Detail from './componentes/Details/Detail'



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/videogame' component={CreateGame}/>
        {/*<Route path='/home/:id' component={Detail}/> */}
      </Switch>
    </div>
    </BrowserRouter>
  )
}

export default App;
