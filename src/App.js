import './App.scss';
import './Assets/Css/bootstrap.css';
import './Assets/Css/fontawesome.min.css';
import Add from './Components/Add';
import Uncompleted from './Components/Uncompleted';
import Completed from './Components/Completed';
import useFetch from './useFetch';
function App() {
  const { data: tasks, isPending, error,setRequestData,setUncompleted,uncompleted,setTasksLength,tasksLength,setData,doneTasksLength,setDoneTasksLength } = useFetch('http://localhost:8000/tasks');
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='gap'>
            </div>
            { error && <div>{error}</div>}
            { isPending && <div> Loading...</div>}
            { tasks && <div className="card text-white bg-dark content-body">
              <Add setRequestData={setRequestData} uncompleted={uncompleted} setUncompleted={setUncompleted} setTasksLength={setTasksLength} tasksLength={tasksLength}/>              
              <div className="card-body">
                <Uncompleted tasks={tasks.filter((task) => task.status === 'uncompleted')} setRequestData={setRequestData} setUncompleted={setUncompleted} uncompleted={uncompleted} setTasksLength={setTasksLength} tasksLength={tasksLength} setData={setData}/>
              </div>
              <div className="card-body">
                <Completed tasks={tasks.filter((task) => task.status === 'completed')} doneTasksLength={doneTasksLength} setDoneTasksLength={setDoneTasksLength} setRequestData={setRequestData} />
              </div>
            </div> }
            <div className='gap'>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
