import express from 'express';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "Why don't scientists trust atoms?",
            content: "Because they make up everything!"
        },
        {
            id: 2,
            title: "Why did the math book look sad?",
            content: "Because it had too many problems."
        },
        {
            id: 3,
            title: "Why did the scarecrow win an award?",
            content: "Because he was outstanding in his field."
        }
    ];
    res.send(jokes);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
