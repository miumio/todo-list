import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

export default function App() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            todo: data.get('todo'),
        });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h2'>
                    Todo list app
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        margin='normal'
                        required
                        id='todo'
                        label='todo'
                        autoFocus
                    />
                    <Button
                        type='submit'
                        endIcon={<AddIcon />}
                        variant='contained'
                        sx={{ ml: 4 }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
