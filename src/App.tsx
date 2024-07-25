import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ListAllTask } from './components/ListAllTask';
import { TaskById } from './components/TaskById';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App" style={{width:"100%"}}>
      <Routes>
        <Route path='/' element={<ListAllTask/>}/>
        <Route path='/tasks/:id' element={<TaskById/>}/>
      </Routes>
    </div>
  );
}

export default App;
