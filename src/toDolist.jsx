import React, { useState, useEffect, useRef } from 'react';


function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : ["Eat", "Sleep", "Drink"];
    });
    const [newTask, setNewTask] = useState("");
    const cursorRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.pageX}px`;
                cursorRef.current.style.top = `${e.pageY}px`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    const title = "to do list"
    return (
        < div className='to-do-list' >
            <div className="cursor" ref={cursorRef}></div>

            <h1>
                {title.split("").map((letra) => (
                    <span className="letra">{letra}</span>
                ))}
            </h1>
            <input
                type="text"
                placeholder='Enter a task'
                value={newTask}
                onChange={handleInputChange}
            />
            <button className='add-button' onClick={addTask}>➕</button>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>🗑️</button>
                        <button className='move-button' onClick={() => moveTaskUp(index)}>⬆️</button>
                        <button className='move-button' onClick={() => moveTaskDown(index)}>⬇️</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
