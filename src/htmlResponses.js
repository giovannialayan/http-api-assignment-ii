const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const serveFile = (request, response, file, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(file);
  response.end();
};

const getIndex = (request, response) => {
  serveFile(request, response, index, 'text/html');
};

const getStyle = (request, response) => {
  serveFile(request, response, style, 'text/css');
};

module.exports = {
  getIndex,
  getStyle,
};
