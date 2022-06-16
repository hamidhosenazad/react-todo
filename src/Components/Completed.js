import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleNotch,faCalendar, faTrash,faBoxOpen } from "@fortawesome/fontawesome-free-solid";
const Completed = ({ tasks, setRequestData, doneTasksLength, setDoneTasksLength }) => {
    const [completed, setCompleted] = useState(false);
    const iconMouseOver = (e) => {
        e.target.classList.add('icon-hover-effect-completed');
    }
    const iconMouseOut = (e) => {
        e.target.classList.remove('icon-hover-effect-completed');
    }
    const comepletedHandleClick = () => {
        setCompleted(!completed);
    }
    const trashHandleClick = (id) => {
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'DELETE'
        }).then(() => {
            setRequestData(new Date());
            setDoneTasksLength(doneTasksLength - 1);
        });
    }
    return (
        <div className='row'>
            {doneTasksLength > 0 && <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h5 className="card-title"><span onClick={comepletedHandleClick}><FontAwesomeIcon icon={faChevronRight} size='sm' className={`${completed ? "rotate-icon" : ""}`} /> Completed</span></h5>
                    </div>
                </div>
                {tasks.map((task) => (
                    <div className={`row list-item-completed hide-list${completed ? "show-list" : ""}`} key={task.id}>

                        <div className='col-md-10'>
                            <p className='completed-text-line-through'><FontAwesomeIcon icon={faCircleNotch} size='sm' onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} className="completed-icon"/> {task.task}</p>
                            <p className='creation-date'><FontAwesomeIcon icon={faCalendar} size='sm' /> {new Date(task.created_at).toDateString()}</p>
                        </div>
                        <div className='col-md-2'>
                            <p className=''>
                                <FontAwesomeIcon icon={faTrash} onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} onClick={() => { trashHandleClick(task.id) }}/>
                            </p>
                        </div>

                    </div>))}
            </div>}
            {doneTasksLength === 0 && <div>
                <div className='col-md-12'>
                    <h5> <FontAwesomeIcon icon={faBoxOpen} size='sm' onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} /> Completed list is empty</h5>
                    <figure>
                        <blockquote className="blockquote">
                            <p className="mb-0">Continuous improvement is better than delayed perfection </p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Mark Twain
                        </figcaption>
                    </figure>
                </div>
            </div>}
        </div>


    );
}
export default Completed;