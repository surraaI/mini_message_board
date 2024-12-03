const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get('/', (req, res) => {
  res.render('index', { title: "Mini Messageboard", messages });
});

app.get('/new', (req, res) => {
  res.render('form', { title: "Add a New Message" });
});

app.post('/new', (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  res.redirect('/');
});

app.get('/message/:id', (req, res) => {
  const message = messages[req.params.id];
  if (message) {
    res.render('message', { title: "Message Details", message });
  } else {
    res.status(404).send("Message not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
