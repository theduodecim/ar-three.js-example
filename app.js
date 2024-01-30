require('dotenv').config();

/*HTTPS LOCALHOST END */
var cors = require('cors');
/*Express Init */
const express = require('express');
const app = express();
app.use(cors({ origin: "*" }));
//var jsonParser = bodyParser.json();
const fetch = require('node-fetch');
const fs = require('fs');
const https = require('https');
var logger = require("morgan");
const helmet = require("helmet");

const agent = new https.Agent({
    rejectUnauthorized: false
});
app.use(
    logger('dev')
  );
  const path = require('path');


// Point it to the current directory as a static server
app.use(express.static('./dist/'))
app.set('view engine', 'pug');

  //security Library
app.use(helmet.contentSecurityPolicy({
    useDefaults: false
  }));

//routes
const httpsOptions = {
    key: fs.readFileSync( path.join(__dirname, 'https/server.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'https/server.crt'), 'utf8')
}
const port = 3000;//process.env.PORT;
const SteamStrategyApiKey = ''//process.env.APIKEYSTEAM;
const serverUrl = ''//process.env.SERVERURL + ':' + port;

const server = https.createServer(httpsOptions, app).listen(process.env.PORT || port, '0.0.0.0', () => {
    console.log('server running at ' + port);
});

app.get('/', (req,res) =>{
   console.log('ok')
  res.send('Server Ok');
});

//routes
//var pinterestRoutes = require('./routes/pinterest.routes').router;
//app.use(pinterestRoutes);