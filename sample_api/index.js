const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const compression = require('compression');
const Mock = require('mockjs');

const app = express();
const expressWs = require('express-ws')(app);

app.use(multer().none());
app.use(express.static('web'));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, *'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.options('*', (req, res) => {
  res.sendStatus(200);
});

// login
const authedToken = [];

const isAuth = (req, res) => {
  console.log(req.headers);
  if (
    !req.headers.authorization ||
    authedToken.indexOf(req.headers.authorization) < 0
  ) {
    res.status(500).send({
      message: 'Auth error!',
      code: '999'
    });
    return false;
  }
  return true;
};

app.post('/auth/login', (req, res) => {
  const user = req.body;

  if (!user || !user.password || user.password !== 'password') {
    return res.status(400).send({
      message: 'Auth error!',
      code: '999'
    });
  }

  const id = uuidv4();
  authedToken.push(id);

  const result = Mock.mock({
    token: id,
    userName: 'admin',
    roles: ['role1', 'role2', 'role3']
  });

  console.log(JSON.stringify(result));
  res.json(result);
});

app.get('/auth/isAuth', (req, res) => {
  if (!isAuth(req, res)) return;
  res.sendStatus(200);
});

// todo-list
const todoList = [
  {
    id: '4660d9c7-6761-48e8-b743-cd42ad4b6300',
    name: 'ACN太郎',
    bankName: 'テスト銀行',
    bankCode: '1234',
    branchName: '新橋支店',
    accountNo: '00000000',
    accountType: '普通'
  },
  {
    id: '4660d9c7-6761-48e8-b743-cd42ad4b6301',
    name: 'ACN次郎',
    bankName: 'テスト２銀行',
    bankCode: '1234',
    branchName: '心斎橋支店',
    accountNo: '00000000',
    accountType: '当座'
  },
  {
    id: '4660d9c7-6761-48e8-b743-cd42ad4b6302',
    name: 'ACN三郎',
    bankName: 'テスト３銀行',
    bankCode: '1234',
    branchName: '新橋支店',
    accountNo: '00000000',
    accountType: '総合'
  }
];

app.get('/address/list', (req, res) => {
  res.json(todoList);
});

app.post('/address/add', (req, res) => {
  const todoData = req.body;
  console.log(todoData);

  const id = uuidv4();
  const todoItem = {
    id: id,
    name: todoData.name,
    bankName: todoData.bankName,
    bankCode: todoData.bankCode,
    branchName: todoData.branchName,
    accountNo: todoData.accountNo,
    accountType: todoData.accountType
  };

  todoList.push(todoItem);
  console.log('Add: ' + JSON.stringify(todoItem));
  res.json(todoItem);
});

app.delete('/address/item/:id', (req, res) => {
  const deleteFromAddressList = function(id) {
    const index = todoList.findIndex(item => item.id === id);
    if (index >= 0) {
      const deleted = todoList.splice(index, 1);
      console.log('Delete: ' + JSON.stringify(deleted[0]));
    }
  };
  if (req.params.id.split(',').length > 1) {
    req.params.id.split(',').forEach(id => {
      deleteFromAddressList(id);
    });
  } else {
    deleteFromAddressList(req.params.id);
  }
  res.json({ result: 'OK' });
});

app.put('/address/item/:id', (req, res) => {
  const todoData = req.body;
  console.log(todoData);

  const index = todoList.findIndex(item => item.id === req.params.id);
  if (index >= 0) {
    const item = todoList[index];
    item.name = todoData.name;
    item.bankName = todoData.bankName;
    item.bankCode = todoData.bankCode;
    item.branchName = todoData.branchName;
    item.accountNo = todoData.accountNo;
    item.accountType = todoData.accountType;
    console.log('Edit: ' + JSON.stringify(item));
  }
  res.json({ result: 'OK' });
});

// chat
let connects = [];

app.ws('/chat', (ws, req) => {
  connects.push(ws);

  ws.on('message', message => {
    console.log('Received -', message);

    connects.forEach(socket => {
      socket.send(message);
    });
  });

  ws.on('close', () => {
    connects = connects.filter(conn => {
      return conn === ws ? false : true;
    });
  });
});

// charts
app.get('/charts/visitData', (req, res) => {
  let month = 0;

  res.json(
    Mock.mock({
      'data|25': [
        {
          'x|+1': function() {
            month++;
            return '2019-1-' + month;
          },
          y: '@natural(10, 10000)'
        }
      ]
    })
  );
});

app.get('/charts/totalSalePercent', (req, res) => {
  res.json({ data: Mock.Random.natural(10, 100) });
});

app.get('/charts/saleTrend', (req, res) => {
  let month = 0;

  res.json(
    Mock.mock({
      'data|12': [
        {
          'x|+1': function() {
            month++;
            return month + '月';
          },
          y: '@natural(10, 10000)'
        }
      ]
    })
  );
});

app.listen(3000, () => console.log('Listening on port 3000'));
