 import './App.css';
import Header from './Components/Header';
 import Mycards from './Components/Mycards';
  
function App() {
  return (
    <div className="App ">
       <Header items={ ['section-1', 'section-2'] } />
       <Mycards items={ ['section-1'] }/>      

      </div>
  );
}

export default App;
