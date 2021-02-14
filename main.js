const auth = require('./auth.json');
const axios = require('axios');
const url = 'https://temtem-api.mael.tech/api/';

const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: [ 'channel_name' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  console.log(`${tags['display-name']}: ${message}`);
});





function menu(input) {
  let command = input.split(" ");
  let args = [];
  command.forEach(com => {
    com = com.toLowerCase();
    com = com.charAt(0).toUpperCase() + com.substring(1);
    if (com == "Dna") com = "DNA";
    args.push(com);
  });
  args[0] = args[0].toLowerCase();
  console.log('command: ' + args);

  switch (args[0]) {
    case "getTem":
      getTemInfo(args[1]);
      break;
    case "freeTem":
      freeTem(args[1], args[2]);
      break;
    /* API IS BUSTED
    case "temRewards":
      temRewards();
      break;
    */
    case "types":
      types();
      break;
    case "con":
      conditions(args[1]);
      break;
    case "tech":
      techniques(args.slice(1).join(' '));
      break;
    /*
  case "course":
    courses(command[1]);
    break;
    */
    case "trait":
      traits(args[1]);
      break;
    case "item":
      items(args.slice(1).join(' '));
      break;
    case "gear":
      gear(args.slice(1).join(' '));
      break;
    case "quest":
      quests(args.slice(1).join(' '));
      break;
    case "dojo":
      dojos(args.slice(1).join(' '));
      break;
    /*
    case "characters":
      characters();
      break;
    */
    case "saipark":
      saipark();
      break;
    case "location":
      locations(args.slice(1).join(' '));
      break;
    case "cosmetic":
      cosmetics(args.slice(1).join(' '));
      break;
    /*
    case "dyes":
      dyes();
      break;
    */
    case "patch":
      patches();
      break;
    case "weak":
      weaknesses(args.slice(1).join(' '));
      break;
    /*
    case "weakCalc":
      weakCalc();
      break;
    */
    default:
      console.log("Please provide correct input");
      break;
  }
}

// '/api/temtems'
//Admin command that updates a list of all tems.
/*
async function getAllTem() {
  axios.get(url + 'temtems')
    .then(function (response) {
      let names = "{";
      response.data.forEach(tem => {
        names += "\"" + tem.name.toLowerCase() + "\"" + ":" + "\"" + tem.number + "\",";
      });
      names = names.substring(0, names.length - 1);
      names += "}";
      fs.writeFile("lists/temtem.json", names, function (err) {
        if (err) { console.log(err) }
      })
      console.log("List saved!");
    })
    .catch(function (error) {
      console.log(error);
    })
  return;
}
*/

// '/api/temtems/[number]'
function getTemInfo(temName) {
  axios.get(url + 'temtems?names=' + temName)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
  return;
}

// '/api/freetem/[temtem]/[level]'
async function freeTem(temName, level) {
  axios.get(url + 'freetem/' + temName + "/" + level)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("Either the name or the level was not inputed correctly!");
    })
  return;
}

// '/api/freetem/rewards'
/* DOES NOT WORK IN THE API
async function temRewards() {
  axios.get(url + 'freetem/rewards')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
    return;
}
*/

// '/api/types'
async function types() {
  axios.get(url + 'types/')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find data!");
    })
  return;
}

async function conditions(con) {
  axios.get(url + 'conditions?names=' + con)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
  return;
}

// '/api/techniques'
async function techniques(tech) {
  axios.get(url + 'techniques?names=' + tech)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
  return;
}

/*
// '/api/training-courses'
async function courses(course) {
  axios.get(url + 'training-courses?number=' + course.toUpperCase())
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
  return;
}
*/

// '/api/traits'
async function traits(trait) {
  axios.get(url + 'traits?names=' + trait)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find trait!");
    })
  return;
}

// '/api/items'
async function items(item) {
  axios.get(url + 'items?names=' + item)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find item!");
    })
  return;
}

// '/api/gear'
async function gear(gear) {
  axios.get(url + 'gear?names=' + gear)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find gear!");
    })
  return;
}

// '/api/quests'

// '/api/quests'
async function quests(quest) {
  axios.get(url + 'quests?names=' + quest)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find quest!");
    })
  return;
}

// '/api/dojos'
async function dojos(dojo) {
  axios.get(url + 'dojos?names=' + dojo)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find dojo!");
    })
  return;
}

// '/api/characters'
/* can only provide wiki links, not worth it
async function characters() {

}
*/

// '/api/saipark'
async function saipark() {
  axios.get(url + 'saipark?limit=1')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find saipark!");
    })
  return;
}

// '/api/locations'
async function locations(location) {
  axios.get(url + 'locations?names=' + location)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find location!");
    })
  return;
}

// '/api/cosmetics'
async function cosmetics(cosm) {
  axios.get(url + 'cosmetics?names=' + cosm)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find cosmetic!");
    })
  return;
}

// '/api/dyes'
/* not really worth implementing
async function dyes() {

}
*/

// '/api/patches'
async function patches() {
  axios.get(url + 'patches?limit=1')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("could not find patches!");
    })
  return;
}

// '/api/weaknesses'
async function weaknesses(weak) {
  axios.get(url + 'weaknesses')
    .then(function (response) {
      console.log(response.data[weak]);
    })
    .catch(function (error) {
      console.log("could not find patches!");
    })
  return;
}

/*
// '/api/weaknesses/calculate'
async function weakCalc() {

}
*/