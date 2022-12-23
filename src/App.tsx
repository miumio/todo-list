import React, { FC, ChangeEvent, useState, useEffect } from 'react';
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
import axios from 'axios';

const theme = createTheme();

const App: FC = () => {
    const TOKEN = '5790750760:AAGQLjHctAIeg30rJJzoQtQWIZ94K5GQ8Ic';
    const CHAT_ID = '-1001658794705';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    
    const [task, setTask] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    
    function sendMessage(msg: string) {
        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: msg
        });
    }
    const [todoList, setTodoList] = useState<ITask[]>([]);

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('todoList') ?? '{}');
        setTodoList(storedList);
    }, []);

    const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === 'task') {
            setTask(event.target.value);
        } else {
            setDesc(event.target.value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!task) {
            return;
        }

        let msg = `New task added: <b>${task}</b>`;
        console.log(msg);

        const newTask = { taskName: task, taskDesc: desc };
        setTodoList([...todoList, newTask]);
        localStorage.setItem(
            'todoList',
            JSON.stringify([...todoList, newTask]),
        );

        sendMessage(msg);

        setTask('');
        setDesc('');
    };

    const completeTask = (el: string): void => {
        const elements = todoList.filter((task) => task.taskName !== el);
        let msg = `Task <b>${el}</b> is finished`;

        setTodoList(elements);
        localStorage.setItem('todoList', JSON.stringify(elements));
        sendMessage(msg);

    };

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
                            return (
                                <TodoTask
                                    key={key}
                                    task={task}
                                    completeTask={completeTask}
                                />
                            );
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
                            label='Task Desc'
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
