const auth = require('./auth.json');
const axios = require('axios');
const fs = require('fs');
const temList = require('./temtem.json');
const url = 'https://temtem-api.mael.tech/api/';



function menu(input) {
  let command = input.split(" ");
  console.log('command: ' + command);
  
  switch (command[0]) {
    /* with over 130 tems, will bomb stream chat */
    case "getTems":
      getAllTem();
      break;
    case "getTem":
      getTemInfo(command[1]);
      break;
    case "freeTem":
      freeTem(command[1], command[2]);
      break;
    case "temRewards":
      temRewards();
      break;
    case "types":
      types();
      break;
    case "conditions":
      conditions();
      break;
    case "techniques":
      techniques();
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
      names = names.substring(0, names.length-1);
      names += "}";
      fs.writeFile("temtem.json", names, function (err){
        if(err) { console.log(err) }
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

}

// '/api/freetem/rewards'
async function temRewards() {

}

// '/api/types'
async function types() {

}

// '/api/conditions'
async function conditions() {

}

// '/api/techniques'
async function techniques() {

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
menu('getTem Oree');
//console.log(temList.oree);