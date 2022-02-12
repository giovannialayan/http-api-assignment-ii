const users = {};

const respond = (request, response, content, status) => {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  if (request.method === 'HEAD') {
    return respondMeta(request, response, 200);
  }

  const responseJson = {
    users,
  };

  return respond(request, response, responseJson, 200);
};

const addUser = (request, response, body) => {
  const responseJson = {
    message: 'name and age are both required',
  };

  if (!body.name || !body.age) {
    responseJson.id = 'addUserMissingParams';
    return respond(request, response, responseJson, 400);
  }

  let responseCode = 204;

  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJson.message = 'created successfully';
    return respond(request, response, responseJson, responseCode);
  }

  return respondMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJson = {
    message: 'the page you were looking for was not found',
    id: 'notFound',
  };

  const status = 404;

  return respond(request, response, responseJson, status);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
