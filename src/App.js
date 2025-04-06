import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import List from './components/List'
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<List/>}>

              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
