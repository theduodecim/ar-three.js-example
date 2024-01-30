
const express = require('express');
const router = express.Router();
//var jsonParser = bodyParser.json();
const fetch = require('node-fetch');
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: false
});
var api24hourToken = 'pina_AMAZNQIWAA7EOAAAGCANKCIRRKZIDCYBQBIQD7HKZRM3RYXYF7IYDUDLOUJ27ZGHVGPBR5W2SYOH3H2B3T6CY6COA55QELIA';
var getPins = (res) =>  {
  const pinsEndpoint = `https://api.pinterest.com/v5/pins`;
  fetch(pinsEndpoint,
    {
          agent: agent,
          headers: {
            'Authorization': `Bearer ${api24hourToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
      })
     .then(res => res.json())
      .then(data => {
        console.log(data);
        res.send(data); 
      }).catch(err => {
        console.error(err);
      });
  }
router.get('/pinterest-list-24-hour-trial', (req, res) => {
     getPins(res);
});


router.get('/update-token-manual/:id', (req,res) =>{
  var newToken = req.params.id;
      const lastChar = newToken.charAt(newToken.length - 1);
      console.log(lastChar); // Outputs: "!"
      if(lastChar == 'x') {
        api24hourToken = newToken.slice(0, -1);
        res.send(`token ID: ${api24hourToken}`);
      }else {
        res.send(`status ok`);
      }
});


module.exports = {
    router: router
}