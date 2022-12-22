import React from 'react';
import { ITask } from '../Interfaces';

interface Props {
    task: ITask;
    completeTask(el: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <>
            {task.taskName} {task.taskDesc}

            <button onClick={() => {completeTask(task.taskName)}}>x</button>
            <p>It is {new Date().toLocaleString() } </p>
        </>
    );
};

export default TodoTask;
