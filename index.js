const express = require('express');
const app = express();
const path = require('path');

const Pusher = require('pusher');
const bodyParser = require('body-parser');

const pusher = new Pusher({
  appId: '1084194',
  key: 'b89ae341fd62ea3f476d',
  secret: '77edf43f58dd473f2c2e',
  cluster: 'ap3',
  encrypted: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/comment', (req, res) => {
  console.log(req.body);
  const newMessage = {
    name: req.body.name,
    message: req.body.message,
  };
  pusher.trigger('my-channel', 'my-event', newMessage); //req.bodyをそのままfrontにsend
  res.json({ created: true });
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
