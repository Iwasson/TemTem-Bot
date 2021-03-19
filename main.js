const auth = require('./auth.json');
const axios = require('axios');
const url = 'https://temtem-api.mael.tech/api/';

const tmi = require('tmi.js');

//const channel = auth.channels;

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: auth.username,
    password: auth.oauth
  },
  channels: [auth.channels]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if(self || !message.startsWith('?'))
    return;
  console.log(`${tags['display-name']}: ${message}`);
  menu(message, channel);
});





function menu(input, channel) {
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
    case "?gettem":
      getTemInfo(args[1], channel);
      break;
    case "?freetem":
      freeTem(args[1], args[2], channel);
      break;
    /* API IS BUSTED
    case "temRewards":
      temRewards();
      break;
    */
   /*
    case "types":
      types();
      break;
      */
    /*
    case "con":
      conditions(args[1]);
      break;
    */
    case "?tech":
      techniques(args.slice(1).join(' '), channel);
      break;
    /*
  case "course":
    courses(command[1]);
    break;
    */
    case "?trait":
      traits(args[1], channel);
      break;
    /*
    case "item":
      items(args.slice(1).join(' '));
      break;
    */
    case "?gear":
      gear(args.slice(1).join(' '), channel);
      break;
    /*
    case "quest":
      quests(args.slice(1).join(' '));
      break;
    */
   /*
    case "dojo":
      dojos(args.slice(1).join(' '));
      break;
      */
    /*
    case "characters":
      characters();
      break;
    */
    case "?saipark":
      saipark(channel); //post twitter url
      break;
    
    case "?location":
      locations(args.slice(1).join(' '), channel);
      break;
    /*
    case "cosmetic":
      cosmetics(args.slice(1).join(' '));
      break;
      */
    /*
    case "dyes":
      dyes();
      break;
    */
    case "?patch":
      patches(channel);
      break;
    
    case "?weak":
      weaknesses(args.slice(1).join(' '), channel);
      break;
    /*
    case "weakCalc":
      weakCalc();
      break;
    */
    case "?help":
      let output = "Here are all of the available commands: " + 
                   "?gettem <tem-name>" + " | " +
                   "?freetem <tem-name> <level>" + " | " +
                   "?trait <trait-name>" + " | " +
                   "?tech <technique-name>" + " | " +
                   "?gear <gear-name>" + " | " +
                   "?saipark" +" | " +
                   "?location <location-name>" + " | " +
                   "?weak <type-name>" + " | " +
                   "?patch"; 
      client.say(channel, output);
      break;
    default:
      console.log("Please provide correct input");
      client.say(channel, "Please provide correct input");
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
function getTemInfo(temName, channel) {
  let output = "";
  axios.get(url + 'temtems?names=' + temName)
    .then(function (response) {
      console.log(response.data[0].stats);
      output = response.data[0].name + "\n";
      output += "wiki: " + response.data[0].wikiUrl + " | ";
      output += "Number: " + response.data[0].number + " | ";
      output += "Types: " + response.data[0].types.toString() + " | ";
      output += "Base Stats: \n" 
             + "HP: " + response.data[0].stats.hp + " | "
             + "STA: " + response.data[0].stats.sta + " | "
             + "SPD: " + response.data[0].stats.spd + " | "
             + "ATK: " + response.data[0].stats.atk + " | "
             + "DEF: " + response.data[0].stats.def + " | "
             + "SPATK: " + response.data[0].stats.spatk + " | "
             + "SPDEF: " + response.data[0].stats.spdef + " | "
             + "TOTAL: " + response.data[0].stats.total + " | ";
      output += "Traits: " + response.data[0].traits.toString() + " | ";
      output += "Gender Ratio: " + "Male " + response.data[0].genderRatio.male + "\tFemale " + response.data[0].genderRatio.female + "\n";
      console.log(output);
      client.say(channel, output);
    })
    .catch(function (error) {
      //console.log("could not find tem!");
      output = "could not find tem!";
      client.say(channel, output);
    })
    //client.say(channel, output);
  return;
}

// '/api/freetem/[temtem]/[level]'
async function freeTem(temName, level, channel) {
  let output = "";
  axios.get(url + 'freetem/' + temName + "/" + level)
    .then(function (response) {
      //console.log(response.data);
      output = "Temtem: " + response.data.temtem + " -> ";
      output += "Reward: " + response.data.reward;
      console.log(output);
      client.say(channel, output);
    })
    .catch(function (error) {
      //console.log("Either the name or the level was not inputed correctly!");
      output = "Either the name or the level was not inputed correctly!";
      console.log(output);
      client.say(channel, output);
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
async function types(channel) {
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
async function techniques(tech, channel) {
  let output = "";
  axios.get(url + 'techniques?names=' + tech)
    .then(function (response) {
      //console.log(response.data);
      output = "Type: " + response.data[0].type + " | ";
      output += "Class: " + response.data[0].class + " | ";
      output += "Damage: " + response.data[0].damage + " | ";
      output += "Stamina: " + response.data[0].staminaCost + " | ";
      output += "Hold: " + response.data[0].hold + " | ";
      output += "Priority: " + response.data[0].priority + " | ";
      output += "Synergy: " + response.data[0].synergy;
      console.log(output);
      client.say(channel, output);
    })
    .catch(function (error) {
      //console.log("could not find tem!");
      output = "could not find tem!";
      console.log(output);
      client.say(channel, output);
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
async function traits(trait, channel) {
  let output = "";
  axios.get(url + 'traits?names=' + trait)
    .then(function (response) {
      console.log(response.data);
      output = "Description: " + response.data[0].description + "\n";
      client.say(channel, output);
    })
    .catch(function (error) {
      console.log("could not find trait!");
      output = "could not find trait!";
      client.say(channel, output);
      
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
async function gear(gear, channel) {
  let output = "";
  axios.get(url + 'gear?names=' + gear)
    .then(function (response) {
      //console.log(response.data);
      output = "Name: " + response.data[0].name + " | ";
      output += "Category: " + response.data[0].category + " | ";
      output += "Description: " + response.data[0].gameDescription + "\n";
      client.say(channel, output);
    })
    .catch(function (error) {
      console.log("could not find gear!");
      output = "could not find gear!";
      client.say(channel, output);
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
async function saipark(channel) {
  let output = "";
  axios.get(url + 'saipark?limit=1')
    .then(function (response) {
      console.log(response.data);
      output = "Tweet: " + response.data[0].tweet;
      client.say(channel, output);
    })
    .catch(function (error) {
      console.log("could not find saipark!");
      output = "could not find saipark!";
      client.say(channel, output);
    })
  return;
}

// '/api/locations'
async function locations(location, channel) {
  let output = "";
  axios.get(url + 'locations?names=' + location)
    .then(function (response) {
      console.log(response.data);
      output = "Description: " + response.data[0].description + " | ";
      output += "Temtems: " + response.data[0].temtem.toString() + "\n";
      client.say(channel, output);
    })
    .catch(function (error) {
      console.log("could not find location!");
      output = "could not find location!";
      client.say(channel, output);
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
async function patches(channel) {
  let output = "";
  axios.get(url + 'patches?limit=1')
    .then(function (response) {
      console.log(response.data);
      output = response.data[0].name + " | ";
      output += response.data[0].date + " | ";
      output += response.data[0].url;
      client.say(channel, output);
    })
    .catch(function (error) {
      console.log("could not find patches!");
      output = "could not find patches!";
      client.say(channel, output);
    })
  return;
}

// '/api/weaknesses'
async function weaknesses(weak, channel) {
  let output = "";
  axios.get(url + 'weaknesses')
    .then(function (response) {
      console.log(response.data[weak].Neutral);
      output = "Neutral: " + response.data[weak].Neutral + " | ";
      output += "Wind: " + response.data[weak].Wind + " | ";
      output += "Earth: " + response.data[weak].Earth + " | ";
      output += "Water: " + response.data[weak].Water + " | ";
      output += "Fire: " + response.data[weak].Fire + " | ";
      output += "Nature: " + response.data[weak].Nature + " | ";
      output += "Electric: " + response.data[weak].Electric + " | ";
      output += "Mental: " + response.data[weak].Mental + " | ";
      output += "Digital: " + response.data[weak].Digital + " | ";
      output += "Melee: " + response.data[weak].Melee + " | ";
      output += "Crystal: " + response.data[weak].Crystal + " | ";
      output += "Toxic: " + response.data[weak].Toxic;

      client.say(channel, output);
    })
    .catch(function (error) {
      console.log("could not find type!");
      output = "could not find type!";
      client.say(channel, output);
    })
  return;
}

/*
// '/api/weaknesses/calculate'
async function weakCalc() {

}
*/
