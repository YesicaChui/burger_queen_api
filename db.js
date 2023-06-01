// exporto la base de datos del api mock
export const db={
  "orders": [
    {
      "id": 1,
      "userId": 1,
      "client": "Jude Milhon",
      "products": [
        {
          "qty": 1,
          "product": {
            "id": 1,
            "name": "Sandwich de jamón y queso",
            "price": 1000,
            "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "id": 2,
            "name": "Café americano",
            "price": 500,
            "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        }
      ],
      "status": "pending",
      "dateEntry": "2022-03-05 15:00"
    },
    {
      "id": 2,
      "userId": 2,
      "client": "Katie Bouman",
      "products": [
        {
          "qty": 2,
          "product": {
            "id": 2,
            "name": "Café americano",
            "price": 500,
            "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "id": 3,
            "name": "Agua 500ml",
            "price": 500,
            "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/water.jpg",
            "type": "Almuerzo",
            "dateEntry": "2022-03-05 15:14:10"
          }
        }
      ],
      "status": "delivered",
      "dateEntry": "2022-03-05 15:00",
      "dateProcessed": "2022-03-05 16:00"
    },
    {
      "client": "Carol Shaw",
      "products": [
        {
          "qty": 5,
          "product": {
            "id": 1214,
            "name": "Sandwich de jamón y queso",
            "price": 1000,
            "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg",
            "type": "Desayuno"
          }
        }
      ],
      "status": "pending",
      "dateEntry": "2022-03-05 15:14:10",
      "id": 3
    },
    {
      "client": "Karen",
      "products": [
        {
          "qty": 1,
          "product": {
            "id": 3,
            "name": "Agua 500ml",
            "price": "4",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            "type": "Almuerzo",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Hotdog",
            "price": "12",
            "image": "https://i.pinimg.com/originals/e5/df/a9/e5dfa90ca6ad3c81d54051ecc7017ae2.png",
            "type": "cena",
            "id": 6
          }
        }
      ],
      "status": "delivered",
      "dateEntry": "2023-05-15 22:26:16",
      "id": 5,
      "dateProcessed": "2023-05-15 22:28:25"
    },
    {
      "client": "Melani",
      "products": [
        {
          "qty": 2,
          "product": {
            "id": 1,
            "name": "Sandwich de jamón y queso",
            "price": "12",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 2,
          "product": {
            "name": "Gaseosa Coca Cola",
            "price": "6",
            "image": "https://mmkfoods.pe/wp-content/uploads/2020/06/GASEOSA-COCA-COLA-1.5-ENVASE-NO-RETOR.-1-600x600.png",
            "type": "cena",
            "id": 4
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Hotdog",
            "price": "12",
            "image": "https://i.pinimg.com/originals/e5/df/a9/e5dfa90ca6ad3c81d54051ecc7017ae2.png",
            "type": "cena",
            "id": 6
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Hamburguesa de Cordero",
            "price": "15",
            "image": "https://www.pngplay.com/wp-content/uploads/2/Burger-PNG-Photo-Image.png",
            "type": "cena",
            "id": 5
          }
        }
      ],
      "status": "canceled",
      "dateEntry": "2023-05-15 22:27:58",
      "id": 6
    },
    {
      "client": "Melani",
      "products": [
        {
          "qty": 1,
          "product": {
            "id": 1,
            "name": "Sandwich de jamón y queso",
            "price": "12",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Gaseosa Coca Cola",
            "price": "6",
            "image": "https://mmkfoods.pe/wp-content/uploads/2020/06/GASEOSA-COCA-COLA-1.5-ENVASE-NO-RETOR.-1-600x600.png",
            "type": "cena",
            "id": 4
          }
        }
      ],
      "status": "delivered",
      "dateEntry": "2023-05-16 14:31:50",
      "id": 7,
      "dateProcessed": "2023-05-16 14:32:03"
    },
    {
      "client": "Karen",
      "products": [
        {
          "qty": 2,
          "product": {
            "id": 1,
            "name": "Sandwich de jamón y queso",
            "price": "12",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "id": 2,
            "name": "Café americano",
            "price": "10",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        }
      ],
      "status": "delivering",
      "dateEntry": "2023-05-16 23:37:12",
      "id": 8,
      "dateProcessed": "2023-05-17 00:49:35"
    },
    {
      "client": "Juliana",
      "products": [
        {
          "qty": 3,
          "product": {
            "id": 1,
            "name": "Sandwich de jamón y queso",
            "price": "12",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Gaseosa Coca Cola",
            "price": "6",
            "image": "https://mmkfoods.pe/wp-content/uploads/2020/06/GASEOSA-COCA-COLA-1.5-ENVASE-NO-RETOR.-1-600x600.png",
            "type": "cena",
            "id": 4
          }
        },
        {
          "qty": 4,
          "product": {
            "id": 3,
            "name": "Agua 500ml",
            "price": "4",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            "type": "Almuerzo",
            "dateEntry": "2022-03-05 15:14:10"
          }
        }
      ],
      "status": "canceled",
      "dateEntry": "2023-05-16 23:58:42",
      "id": 9
    },
    {
      "client": "Chio",
      "products": [
        {
          "qty": 1,
          "product": {
            "id": 2,
            "name": "Café americano",
            "price": "10",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Gaseosa Coca Cola",
            "price": "6",
            "image": "https://mmkfoods.pe/wp-content/uploads/2020/06/GASEOSA-COCA-COLA-1.5-ENVASE-NO-RETOR.-1-600x600.png",
            "type": "cena",
            "id": 4
          }
        }
      ],
      "status": "canceled",
      "dateEntry": "2023-05-17 00:02:11",
      "id": 10
    },
    {
      "client": "Ana",
      "products": [
        {
          "qty": 3,
          "product": {
            "id": 2,
            "name": "Café americano",
            "price": "10",
            "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            "type": "Desayuno",
            "dateEntry": "2022-03-05 15:14:10"
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Hamburguesa de Cordero",
            "price": "15",
            "image": "https://www.pngplay.com/wp-content/uploads/2/Burger-PNG-Photo-Image.png",
            "type": "cena",
            "id": 5
          }
        },
        {
          "qty": 1,
          "product": {
            "name": "Hotdog",
            "price": "12",
            "image": "https://i.pinimg.com/originals/e5/df/a9/e5dfa90ca6ad3c81d54051ecc7017ae2.png",
            "type": "cena",
            "id": 6
          }
        }
      ],
      "status": "delivering",
      "dateEntry": "2023-05-17 00:39:40",
      "id": 11,
      "dateProcessed": "2023-05-17 00:47:32"
    }
  ],
  "products": [
    {
      "id": 1,
      "name": "Sandwich de jamón y queso",
      "price": "12",
      "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
      "type": "Desayuno",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "id": 2,
      "name": "Café americano",
      "price": "10",
      "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
      "type": "Desayuno",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "id": 3,
      "name": "Agua 500ml",
      "price": "4",
      "image": "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
      "type": "Almuerzo",
      "dateEntry": "2022-03-05 15:14:10"
    },
    {
      "name": "Gaseosa Coca Cola",
      "price": "6",
      "image": "https://mmkfoods.pe/wp-content/uploads/2020/06/GASEOSA-COCA-COLA-1.5-ENVASE-NO-RETOR.-1-600x600.png",
      "type": "cena",
      "id": 4
    },
    {
      "name": "Hamburguesa de Cordero",
      "price": "15",
      "image": "https://www.pngplay.com/wp-content/uploads/2/Burger-PNG-Photo-Image.png",
      "type": "cena",
      "id": 5
    },
    {
      "name": "Hotdog",
      "price": "12",
      "image": "https://i.pinimg.com/originals/e5/df/a9/e5dfa90ca6ad3c81d54051ecc7017ae2.png",
      "type": "cena",
      "id": 6
    }
  ],
  "users": [
    {
      "email": "anita.borg@systers.xyz",
      "password": "g6WQSrsv7rC7et5B",
      "role": "admin",
      "id": 1
    },
    {
      "email": "grace.hopper@systers.xyz",
      "password": "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
      "role": "admin",
      "id": 2
    },
    {
      "email": "karen@gmail.com",
      "password": "123456",
      "role": "admin",
      "id": 3
    },
    {
      "email": "franco@gmail.com",
      "password": "1234567",
      "role": "chef",
      "id": 5
    },
    {
      "email": "luisito@gmail.com",
      "password": "12345",
      "role": "waiter",
      "id": 6
    },
    {
      "email": "claudio@gmail.com",
      "password": "$2a$10$cs53B7lO6cT4p/LFpomVuOwF0vpS/djCtzON.raedT/iWlmrmX.5G",
      "role": "chef",
      "id": 7
    }
  ]
}