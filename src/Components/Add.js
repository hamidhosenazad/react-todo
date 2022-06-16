import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from "@fortawesome/fontawesome-free-solid";
import { useState } from 'react';

const Add = ({ setRequestData, setUncompleted,setTasksLength,tasksLength }) => {
    const [task, setTask] = useState('');
    const [isPending, setIsPending] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const created_at = Date.now();
        const status = 'uncompleted';
        const important = 'no';
        const todo = { task, status, important, created_at };
        setIsPending(true);
        fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        }).then(() => {
            console.log('new task added');
            setRequestData(new Date());
            setIsPending(false);
            setTask('');
            setUncompleted(true);
            setTasksLength(tasksLength+1);
        });
    }
    return (
        <div className="card-header">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-10">
                        <div className="form-group">
                            <input type="text" className="form-control" id="addTask" aria-describedby="addTask" placeholder="Add Task"
                                required
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                maxLength="100"
                                minLength="3"
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        {!isPending && <button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add</button>}
                        {isPending && <button disabled className="btn btn-primary"><FontAwesomeIcon icon={faSpinner} /> Adding blog...</button>}
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Add;