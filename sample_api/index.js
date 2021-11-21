const express = require("express");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const bodyParser = require("body-parser");
const compression = require("compression");
const Mock = require("mockjs");

const app = express();
const expressWs = require("express-ws")(app);

app.use(multer().none());
app.use(express.static("web"));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

// login
const authedToken = [];

const isAuth = (req, res) => {
  if (
    !req.headers.authorization ||
    authedToken.indexOf(req.headers.authorization) < 0
  ) {
    return res.status(500).send({
      global: [{ message: "Auth error!", code: 999 }],
    });
    return false;
  }
  return true;
};

app.post("/auth/login", (req, res) => {
  const user = req.body;
  console.log(JSON.stringify(user));
  if (!user || !user.password || user.password !== "password") {
    return res.status(400).send({
      global: [{ message: "Auth error!", code: 999 }],
    });
  }

  const uuid = uuidv4();
  const accessToken = uuidv4();
  const refreshToken = uuidv4();

  authedToken.push(accessToken);

  const result = Mock.mock({
    uuid: uuid,
    accessToken: accessToken,
    firstName: "admin",
    lastName: "admin",
    refreshToken: refreshToken,
    roles: ["role1", "role2", "role3"],
  });

  console.log(JSON.stringify(result));
  res.json(result);
});

app.get("/auth/isAuth", (req, res) => {
  if (!isAuth(req, res)) return;
  res.sendStatus(200);
});

const menuItem = [
  {
    label: "home",
    module: "/system/home",
    children: [],
    isGroup: false,
    icon: "home",
  },
  {
    label: "member",
    // icon: "member",
    isGroup: true,
    module: "",
    children: [
      {
        label: "list",
        module: "/member/list",
      },
      {
        label: "search",
        module: "/member/search",
      },
    ],
  },
  {
    label: "map",
    icon: "global",
    isGroup: true,
    module: "",
    children: [
      {
        label: "map",
        module: "/member/map",
      },
    ],
  },
];

app.get("/auth/meun", (req, res) => {
  if (!isAuth(req, res)) return;
  res.json({ data: menuItem });
});

// todo-list
const todoList = [
  {
    id: "4660d9c7-6761-48e8-b743-cd42ad4b6300",
    name: "name1",
    bankName: "bank 1",
    bankCode: "1234",
    branchName: "branch 1 ",
    accountNo: "00000000",
    accountType: "normal",
  },
  {
    id: "4660d9c7-6761-48e8-b743-cd42ad4b6301",
    name: "name 2",
    bankName: "bank 2",
    bankCode: "1234",
    branchName: "branch 2 ",
    accountNo: "00000000",
    accountType: "normal",
  },
  {
    id: "4660d9c7-6761-48e8-b743-cd42ad4b6302",
    name: "name 3",
    bankName: "bank 3",
    bankCode: "1234",
    branchName: "branch 3 ",
    accountNo: "00000000",
    accountType: "normal",
  },
];

app.get("/address/list", (req, res) => {
  res.json(todoList);
});

app.post("/address/add", (req, res) => {
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
    accountType: todoData.accountType,
  };

  todoList.push(todoItem);
  console.log("Add: " + JSON.stringify(todoItem));
  res.json(todoItem);
});

app.delete("/address/item/:id", (req, res) => {
  const deleteFromAddressList = function (id) {
    const index = todoList.findIndex((item) => item.id === id);
    if (index >= 0) {
      const deleted = todoList.splice(index, 1);
      console.log("Delete: " + JSON.stringify(deleted[0]));
    }
  };
  if (req.params.id.split(",").length > 1) {
    req.params.id.split(",").forEach((id) => {
      deleteFromAddressList(id);
    });
  } else {
    deleteFromAddressList(req.params.id);
  }
  res.json({ result: "OK" });
});

app.put("/address/item/:id", (req, res) => {
  const todoData = req.body;
  console.log(todoData);

  const index = todoList.findIndex((item) => item.id === req.params.id);
  if (index >= 0) {
    const item = todoList[index];
    item.name = todoData.name;
    item.bankName = todoData.bankName;
    item.bankCode = todoData.bankCode;
    item.branchName = todoData.branchName;
    item.accountNo = todoData.accountNo;
    item.accountType = todoData.accountType;
    console.log("Edit: " + JSON.stringify(item));
  }
  res.json({ result: "OK" });
});

// chat
let connects = [];

app.ws("/chat", (ws, req) => {
  connects.push(ws);

  ws.on("message", (message) => {
    console.log("Received -", message);

    connects.forEach((socket) => {
      socket.send(message);
    });
  });

  ws.on("close", () => {
    connects = connects.filter((conn) => {
      return conn === ws ? false : true;
    });
  });
});

// charts
app.get("/charts/visitData", (req, res) => {
  let month = 0;

  res.json(
    Mock.mock({
      "data|25": [
        {
          "x|+1": function () {
            month++;
            return "2019-1-" + month;
          },
          y: "@natural(10, 10000)",
        },
      ],
    })
  );
});

app.get("/charts/totalSalePercent", (req, res) => {
  res.json({ data: Mock.Random.natural(10, 100) });
});

app.get("/charts/saleTrend", (req, res) => {
  let month = 0;

  res.json(
    Mock.mock({
      "data|12": [
        {
          "x|+1": function () {
            month++;
            return month + "月";
          },
          y: "@natural(10, 10000)",
        },
      ],
    })
  );
});

app.listen(3000, () => console.log("Listening on port 3000"));
