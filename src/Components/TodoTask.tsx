import React from 'react';
import { ITask } from '../Interfaces';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

interface Props {
    task: ITask;
    completeTask(el: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <Box>
            {new Date().toLocaleString()} {task.taskName} {task.taskDesc}
            <IconButton
                aria-label='delete'
                onClick={() => {
                    completeTask(task.taskName);
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default TodoTask;
