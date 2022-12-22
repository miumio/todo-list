import React, { FC, ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { ITask } from './Interfaces';
import TodoTask from './Components/TodoTask';

const theme = createTheme();

const App: FC = () => {
    const [task, setTask] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [todoList, setTodoList] = useState<ITask[]>([]);

    const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === 'task') {
            setTask(event.target.value);
        } else {
            setDesc(event.target.value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     task: data.get('task'),
        //     desc: data.get('desc'),
        // });

        const newTask = { taskName: task, taskDesc: desc };
        setTodoList([...todoList, newTask]);
        console.log(todoList);
        setTask('');
        setDesc('');
    };

    const completeTask = (el: string) => {
        setTodoList(todoList.filter((task) => {
            return task.taskName != el
        }))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        ToDo
                    </Typography>
                    <ul>
                        {todoList.map((task: ITask, key: number) => {
                            return <TodoTask key={key} task={task} completeTask={completeTask}/>;
                        })}
                    </ul>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            fullWidth
                            id='task'
                            label='Task Title'
                            name='task'
                            autoComplete='task'
                            autoFocus
                            onChange={handleInput}
                            value={task}
                        />
                        <TextField
                            margin='normal'
                            fullWidth
                            name='desc'
                            label='Tasc Desc'
                            id='desc'
                            onChange={handleInput}
                            value={desc}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            endIcon={<AddIcon />}
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Task
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import AddIcon from '@mui/icons-material/Add';

// import TodoList from './TodoList';

// export default function App() {
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             todo: data.get('todo'),
//         });
//     };

//     return (
//             <Container component='main' maxWidth='xs'>
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Typography component='h1' variant='h2'>
//                         Todo list app
//                     </Typography>
//                     <TodoList />
//                     <Box
//                         component='form'
//                         onSubmit={handleSubmit}
//                         noValidate
//                         sx={{
//                             mt: 1,
//                             display: 'flex',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <TextField
//                             margin='normal'
//                             required
//                             id='todo'
//                             label='todo'
//                             autoFocus
//                         />
//                         <Button
//                             type='submit'
//                             endIcon={<AddIcon />}
//                             variant='contained'
//                             sx={{ ml: 4 }}
//                         >
//                             Add
//                         </Button>
//                     </Box>
//                 </Box>
//             </Container>
//     );
// }
