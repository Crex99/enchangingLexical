const axios = require('axios');
const functions=require("./commonFeauters")


//prende tutti gli edge di una data parola word in input nella lingua lang
const request=async  (r) => {

  const word="rana";
  const lang="it";
  const url_conceptnet="http://api.conceptnet.io/c/"+lang+"/"+word;
  try {
    const response = await axios.get(url_conceptnet);
    let out=response.data.edges;
    out.forEach(element => {
      console.log(element.rel.label)
      console.log(element.start.label)
      //console.log(element.surfaceText)
    });
    r.status(201).send({message:""+out});
  } catch (error) {
    console.log(error);
  }
};

//prende tutte le asserzioni della parola word nella lingua lang
const request0=async  (r,word,lang,sensitive) => {
  let w=functions.formatWordConcept(word);
  lang=functions.formatLang2low(lang);
  const url_conceptnet="https://api.conceptnet.io/query?node=/c/"+lang+"/"+w+"&other=/c/"+lang;
  try {
    const response = await axios.get(url_conceptnet);
    let out=response.data.edges;
    let string="";
    out.forEach(element => {
      console.log("CONCEPTNET")
      string=string+element.rel.label+"\n"+element.start.label+"\n"+element.surfaceText+"\n";
      if(functions.control(word,sensitive,element.start.label)==true){
        console.log(element.rel.label)
        console.log(element.start.label)
      }
      //console.log(element.surfaceText)
    });
    //r.status(201).send({message:""+string});
  } catch (error) {
    console.log("CONCEPTNET")
    console.log(error);
  }
};

//prende tutte le relazioni che collegano word1 con word2 nella lingua lang

const request1=async  (r) => {

  const word1="frog";
  const word2="animal";
  const lang="en";
  const url_conceptnet="https://api.conceptnet.io//query?node=/c/"+lang+"/"+word1+"&other=/c/"+lang+"/"+word2;
  try {
    const response = await axios.get(url_conceptnet);
    let out=response.data.edges;
    out.forEach(element => {
      console.log("\nCONCEPTNET\n")
      console.log(element.rel.label)
      console.log(element.start.label)
    });
    //r.status(201).send({message:""+out});
  } catch (error) {
    console.log(error);
  }
};

module.exports={
  example:request,
  assertions:request0,
  relations:request1
};