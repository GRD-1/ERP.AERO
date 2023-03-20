
//-------- index.js ----------------------------------------------------------------------------------------------------------*/

// this file - the server starter only. It was separated from app.js in order to run the API tests without running app.listener every time
const app = require('./app.js').app;

app.listen(3000, () => console.log("The server started on port 3000 ..."));
