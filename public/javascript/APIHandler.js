class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;

    this.app = axios.create({
      baseURL: "https://minions-api.herokuapp.com",
    });
  }

  getFullList = () => this.app.get("/characters");

  getOneRegister = (id) => this.app.get(`/characters/${id}`);

  createOneRegister = (minion) => this.app.post("/characters", minion);

  updateOneRegister = (id, minion) => this.app.put(`/characters/${id}`, minion);

  deleteOneRegister = (id) => this.app.delete(`/characters/${id}`);
}
/*
Get all the characters info from https://minions-api.herokuapp.com/characters

Get a single character info from https://minions-api.herokuapp.com/characters/:id

Create a single character posting the data to https://minions-api.herokuapp.com/characters

Delete a single character through his id in https://minions-api.herokuapp.com/characters/:id

Edit a single character through his id in https://minions-api.herokuapp.com/characters/:id
*/
