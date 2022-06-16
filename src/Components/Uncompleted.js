import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendar, faChevronRight, faCircleNotch, faStar, faTrash, faCalendarCheck, faBoxOpen } from "@fortawesome/fontawesome-free-solid";
const Uncompleted = ({ tasks, setRequestData, setUncompleted, uncompleted, tasksLength, setTasksLength, setData }) => {
    const [sortPanel, setSortPanel] = useState(false);
    const [alphabetical, setAlphabetical] = useState(false);
    const iconMouseOver = (e) => {
        e.target.classList.add('icon-hover-effect-uncompleted');
    }
    const iconMouseOut = (e) => {
        e.target.classList.remove('icon-hover-effect-uncompleted');
    }
    const uncompletedHandleClick = () => {
        setUncompleted(!uncompleted);
    }
    const sortHandleClick = () => {
        setSortPanel(!sortPanel);
    }
    const alphabeticallyHandleClick = () => {
        tasks = tasks.slice(0);
        tasks = tasks.sort(function (a, b) {
            var x = a.task.toLowerCase();
            var y = b.task.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        setData(tasks);
        setSortPanel(!sortPanel);
        setAlphabetical(true);
        setUncompleted(true);
    }
    const importantHandleClickNo = (id) => {
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ important: 'yes' })
        }).then(() => {
            setRequestData(new Date());
        });
    }
    const importantHandleClickYes = (id) => {
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ important: 'no' })
        }).then(() => {
            setRequestData(new Date());
        });
    }
    const trashHandleClick = (id) => {
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'DELETE'
        }).then(() => {
            setRequestData(new Date());
            setTasksLength(tasksLength - 1);
        });
    }
    const byCreationDateHandleClick = () => {
        tasks = tasks.slice(0);
        tasks.sort(function (a, b) {
            return a.created_at - b.created_at;
        });
        setData(tasks);
        setSortPanel(!sortPanel);
        setUncompleted(true);
    }
    const doneHandleClick = (id) => {
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'completed' })
        }).then(() => {
            setRequestData(new Date());
            setTasksLength(tasksLength - 1);
            console.log(tasksLength);
        });
    }
    return (
        <div className='row'>
            {tasksLength > 0 && <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-10'>
                        <h5 className="card-title"><span onClick={uncompletedHandleClick}><FontAwesomeIcon icon={faChevronRight} size='sm' className={`${uncompleted ? "rotate-icon" : ""}`} /> Uncompleted</span></h5>
                    </div>
                    <div className='col-md-2'>
                        <p><span onClick={sortHandleClick}><FontAwesomeIcon icon={faSort} size='sm' onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} /> Sort </span></p>
                        {
                            sortPanel &&
                            <div className='sort-body'>
                                <div className="card text-white bg-primary">
                                    <div className="card-header">Sort by</div>
                                    <div className="card-body">
                                        <p onClick={alphabeticallyHandleClick} className="card-text"><FontAwesomeIcon icon={faSort} size='sm' /> Alphabetically</p>

                                        <p onClick={byCreationDateHandleClick} className="card-text"><FontAwesomeIcon icon={faCalendarCheck} size='sm' /> Creation date</p>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                {tasks.map((task) => (
                    <div className={`row list-item-uncompleted hide-list${uncompleted ? "show-list" : ""}`} key={task.id}>

                        <div className='col-md-10'>
                            <p><FontAwesomeIcon icon={faCircleNotch} size='sm' onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} onClick={() => { doneHandleClick(task.id) }} /> {task.task}</p>
                            <p className='creation-date'><FontAwesomeIcon icon={faCalendar} size='sm' /> {new Date(task.created_at).toDateString()}</p>
                        </div>
                        <div className='col-md-2'>
                            <p className=''>
                                {task.important == 'yes' && <FontAwesomeIcon icon={faStar} size='sm' className='icon-hover-effect-uncompleted' onClick={() => { importantHandleClickYes(task.id) }} />}
                                {task.important == 'no' && <FontAwesomeIcon icon={faStar} size='sm' onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} onClick={() => { importantHandleClickNo(task.id) }} />}
                                &nbsp;<FontAwesomeIcon icon={faTrash} onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} onClick={() => { trashHandleClick(task.id) }} /></p>
                        </div>

                    </div>))}
            </div>}
            {tasksLength === 0 && <div>
                <div className='col-md-12'>
                    <h5> <FontAwesomeIcon icon={faBoxOpen} size='sm' onMouseOver={iconMouseOver} onMouseOut={iconMouseOut} /> Uncompleted list is empty</h5>
                    <figure>
                        <blockquote className="blockquote">
                            <p className="mb-0">Hard Work beats talent when talent doesn't work hard</p>

                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Tim Notke
                        </figcaption>
                    </figure>
                </div>
            </div>}
        </div>


    );
}
export default Uncompleted;