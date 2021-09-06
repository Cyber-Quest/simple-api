var express = require("express");
var app = express();
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");

app.use(cors());
app.use(express.json());

const server_config = {
  port: 8000,
  messageInitialize: "Seu servidor está rodando na porta:",
};

let list_users = [
  {
    id: "1",
    email: "wesley9983@gmail.com",
    password: "123456",
  },
];

let products = [
  {
    id: "1",
    name: "pão",
    description: "teste",
    value: 244,
    quantity: 4,
  },
];

let categories = [
  {
    id: "1",
    name: "carro",
    description: "fusion 2011",
  },
];

let carousel = [
  {
    id: "1",
    link:
      "https://ppsspp.org/img/screens/small/Final_Fantasy_Type-0_-_Drayano.jpg",
  },
  {
    id: "2",
    link: "https://ppsspp.org/img/screens/small/daxter.jpg",
  },
  {
    id: "3",
    link: "https://ppsspp.org/img/screens/small/gtavcs.jpg",
  },
];

let comments = [
  {
    id: "1",
    message: "Ajuda aqui pf",
    likes: [
      {
        id_user: "1",
      },
    ],
  },
  {
    id: "2",
    message: "Ajuda aqui pf 2",
    likes: [
      {
        id_user: "2",
      },
    ],
  },
  {
    id: "3",
    message: "Ajuda aqui pf 3",
    likes: [
      {
        id_user: "3",
      },
    ],
  },
];

app.get("/", function (req, res) {
  res.send("Bem vindo!");
});

//----------------- auth -----------------//
app.post("/sign-in", function (req, res) {
  const { email, password } = req.body;

  const user_exist = list_users.find((item) => {
    return email === item.email && password === item.password;
  });
  if (user_exist !== undefined) {
    res.send({ email: user_exist.email, token: "2445t3frewgfrthretfgrewewe" });
  }
  res.send({ error: "usuário não encontrado" });
});

app.post("/sign-up", function (req, res) {
  const { email, password } = req.body;
  list_users = [
    ...list_users,
    { id: uuidv4(), email: email, password: password },
  ];
  res.send({});
});

//----------------- users -----------------//
app.get("/user", function (req, res) {
  res.send({ list: list_users });
});

app.delete("/user/:id", function (req, res) {
  const { id } = req.params;
  const new_users = list_users.filter((item) => {
    return id !== item.id;
  });
  list_users = new_users;
  res.send({});
});

//----------------- products -----------------//
app.get("/products", function (req, res) {
  res.send({ list: products });
});

app.post("/products", function (req, res) {
  const { name, description, value, quantity } = req.body;
  products = [
    ...products,
    {
      id: uuidv4(),
      name: name,
      description: description,
      value: value,
      quantity: quantity,
    },
  ];
  res.send({});
});

app.put("/products/:id", function (req, res) {
  const { id } = req.params;
  const { name, description, value, quantity } = req.body;
  const index = products.findIndex((item) => {
    return id === item.id;
  });
  products[index].name = name;
  products[index].description = description;
  products[index].value = value;
  products[index].quantity = quantity;

  res.send({});
});

app.delete("/products/:id", function (req, res) {
  const { id } = req.params;
  const new_products = products.filter((item) => {
    return id !== item.id;
  });
  products = new_products;
  res.send({});
});

//----------------- categories -----------------//
app.get("/categories", function (req, res) {
  res.send({ list: categories });
});

app.post("/categories", function (req, res) {
  const { name, description } = req.body;
  categories = [
    ...categories,
    {
      id: uuidv4(),
      name: name,
      description: description,
    },
  ];
  res.send({});
});

app.put("/categories/:id", function (req, res) {
  const { id } = req.params;
  const { name, description, value, quantity } = req.body;
  const index = categories.findIndex((item) => {
    return id === item.id;
  });
  categories[index].name = name;
  categories[index].description = description;

  res.send({});
});

app.delete("/categories/:id", function (req, res) {
  const { id } = req.params;
  const new_categories = categories.filter((item) => {
    return id !== item.id;
  });
  categories = new_categories;
  res.send({});
});

//----------------- carousel -----------------//
app.get("/carousel", function (req, res) {
  res.send({ list: carousel });
});

app.post("/carousel", function (req, res) {
  const { link } = req.body;
  carousel = [
    ...carousel,
    {
      id: uuidv4(),
      link: link,
    },
  ];
  res.send({});
});

app.delete("/carousel/:id", function (req, res) {
  const { id } = req.params;
  const new_carousel = carousel.filter((item) => {
    return id !== item.id;
  });
  carousel = new_carousel;
  res.send({});
});

//----------------- comment -----------------//
app.get("/comment", function (req, res) {
  res.send({ list: comments });
});

app.post("/comment", function (req, res) {
  const { message } = req.body;
  comments = [
    ...comments,
    {
      id: uuidv4(),
      message: message,
      likes: [],
    },
  ];
  res.send({});
});

app.delete("/comment/:id", function (req, res) {
  const { id } = req.params;
  const new_comment = comments.filter((item) => {
    return id !== item.id;
  });
  comments = new_comment;
  res.send({});
});

//----------------- likes -----------------//
app.put("/like", function (req, res) {
  const { id_comment, id_user } = req.body;
  const index = comments.findIndex((item) => item.id === id_comment);
  const is_commented = comments[index].likes.findIndex(
    (item) => item.id_user === id_user
  );
  if (is_commented === -1) {
    comments[index].likes = [
      ...comments[index].likes,
      {
        id_user: id_user,
      },
    ];
    res.send({});
  } else res.send({ error: "usuário já curtiu esse comentário" });
});

//----------------- server -----------------//
app.listen(server_config.port, function () {
  console.log(`${server_config.messageInitialize} ${server_config.port}`);
});
