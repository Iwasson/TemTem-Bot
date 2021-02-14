const auth = require('./auth.json');
const axios = require('axios');
const fs = require('fs');
const url = 'https://temtem-api.mael.tech/api/';


function menu(input) {
  let command = input.split(" ");
  console.log('command: ' + command);

  switch (command[0]) {
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
    case "con":
      conditions(command[1]);
      break;
    case "tech":
      techniques(command.slice(1).join(' '));
      break;
    case "course":
      courses(command[1]);
      break;
    case "trait":
      traits(command[1]);
      break;
    case "item":
      items(command.slice(1).join(' '));
      break;
    case "gear":
      gear(command.slice(1).join(' '));
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

async function conditions(con){
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

// '/api/training-courses'
async function courses(course) {
  console.log(courseList[course.toLowerCase()]);
  return;
}

// '/api/traits'
async function traits(trait) {
  console.log(traitList[trait.toLowerCase()]);
  return;
}

// '/api/items'
async function items(item) {
  console.log(itemList[item]);
  return;
}

// '/api/gear'
async function gear(gear) {
  console.log(gearList[gear.toLowerCase()]);
  return;
}

// '/api/quests'

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
//menu("con Alerted");
menu("tech Acid Reflux")
//menu("updateCourses");
//menu("course tc001");
//menu("updateTraits");
//menu("trait Avenger");
//menu("updateItems");
//menu("item smoke bomb");
//menu("updateGear");
//menu("gear Aggressive DNA Strand");

//console.log(temList.oree);