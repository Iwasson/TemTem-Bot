const auth = require('./auth.json');
const axios = require('axios');
const fs = require('fs');
const temList = require('./temtem.json');
const conList = require('./conditions.json');
const techList = require('./techniques.json');
const url = 'https://temtem-api.mael.tech/api/';



function menu(input) {
  let command = input.split(" ");
  console.log('command: ' + command);

  switch (command[0]) {
    case "getTems":
      getAllTem();
      break;
    case "getTem":
      getTemInfo(command[1]);
      break;
    case "freeTem":
      freeTem(command[1], command[2]);
      break;
    /* API IS BUSTED
    case "temRewards":
      temRewards();
      break;
    */
    case "types":
      types();
      break;
    case "updateCon":
      updateConditions();
      break;
    case "con":
      conditions(command[1]);
      break;
    case "updateTech":
      updateTechniques();
      break;
    case "tech":
      let techs = command[1];
      if(command[2]) {techs += " " + command[2]}
      if(command[3]) {techs += " " + command[3]}
      techniques(techs);
      break;
    case "courses":
      courses();
      break;
    case "traits":
      traits();
      break;
    case "items":
      items();
      break;
    case "gear":
      gear();
      break;
    case "quests":
      quests();
      break;
    case "dojos":
      dojos();
      break;
    case "characters":
      characters();
      break;
    case "saipark":
      saipark();
      break;
    case "locations":
      locations();
      break;
    case "cosmetics":
      cosmetics();
      break;
    case "dyes":
      dyes();
      break;
    case "patches":
      patches();
      break;
    case "weaknesses":
      weaknesses();
      break;
    case "weakCalc":
      weakCalc();
      break;
    default:
      console.log("Please provide correct input");
      break;
  }
}

// '/api/temtems'
//Admin command that updates a list of all tems.
async function getAllTem() {
  axios.get(url + 'temtems')
    .then(function (response) {
      let names = "{";
      response.data.forEach(tem => {
        names += "\"" + tem.name.toLowerCase() + "\"" + ":" + "\"" + tem.number + "\",";
      });
      names = names.substring(0, names.length - 1);
      names += "}";
      fs.writeFile("temtem.json", names, function (err) {
        if (err) { console.log(err) }
      })
      console.log("List saved!");
    })
    .catch(function (error) {
      console.log(error);
    })
  return;
}

// '/api/temtems/[number]'
function getTemInfo(temName) {
  let temNum = temList[temName.toLowerCase()];
  axios.get(url + 'temtems/' + temNum)
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

// '/api/conditions'
async function updateConditions() {
  let conditions = "{";
  axios.get(url + 'conditions/')
    .then(function (response) {
      response.data.forEach(condition => {
        conditions += "\"" + condition.name.toLowerCase() + "\"" + ":" + "\"" + condition.description + "\",";
      });
      conditions = conditions.substring(0, conditions.length - 1);
      conditions += "}";

      fs.writeFile("conditions.json", conditions, function (err) {
        if (err) { console.log(err) }
      })
      console.log("List saved!");
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
    return;
}

async function conditions(con){
  console.log(conList[con]);
  return;
}

// '/api/techniques'
async function updateTechniques() {
  let techniques = "{";
  axios.get(url + 'techniques/')
    .then(function (response) {
      response.data.forEach(tech => {
        techniques += "\"" + tech.name.toLowerCase() + "\"" + ":"  + JSON.stringify(tech) + ",";
      });
      techniques = techniques.substring(0, techniques.length - 1);
      techniques += "}";

      fs.writeFile("techniques.json", techniques, function (err) {
        if (err) { console.log(err) }
      })
      console.log("List saved!");
    })
    .catch(function (error) {
      console.log("could not find tem!");
    })
    return;
}

// '/api/techniques'
async function techniques(tech) {
  console.log(techList[tech]);
  return;
}

// '/api/training-courses'
async function courses() {

}

// '/api/traits'
async function traits() {

}

// '/api/items'
async function items() {

}

// '/api/gear'
async function gear() {

}

// '/api/quests'
async function quests() {

}

// '/api/dojos'
async function dojos() {

}

// '/api/characters'
async function characters() {

}

// '/api/saipark'
async function saipark() {

}

// '/api/locations'
async function locations() {

}

// '/api/cosmetics'
async function cosmetics() {

}

// '/api/dyes'
async function dyes() {

}

// '/api/patches'
async function patches() {

}

// '/api/weaknesses'
async function weaknesses() {

}

// '/api/weaknesses/calculate'
async function weakCalc() {

}

//menu("getTems");
//menu('getTem Oree');
//menu("freeTem oree 2");
//menu("temRewards");
//menu("types");
//menu("con alerted");
//menu("tech acid reflux")
//console.log(temList.oree);