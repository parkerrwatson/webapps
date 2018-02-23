/*

  In this assignmenmt you are given a list of student names. The challenge
  is to pair students by how similar their names are in edit distance.
  The pairing algorithm  pseudocode is:

  sort the students by last name (A to Z)
  while there is > 1 unpaired student
    X = the first unpaired student
    if X's first name begins with a vowel
      compute the Hamming distance to all other unpaired students

    if X's first name begins with a consonant
      compute the Levenshtein distance to all other unpaired students

    pair X with the most similar name, Y (ie shortest edit distance). If there
    is a tie in edit distance, sort the results by last name (A...Z) and
    take the first.

    remove X and Y from the list of unpaired students.


  to help you, you are provided with the scripts:
    levenshtein.js and hamming.js

  **THERE IS CURRENTLY A NAMING CONFLICT, solve this by wrapping each
    provided distance funciton the JavaScirpt namespace-like construct of your choice.

    YOU CANNOT SIMPLY RENAME the distance functions!
    YOU CANNOT MODIFY THE distance functions IN ANY WAY other than
    to implement your namespace construct!

    I suggest putting each in it's own unique object so in your main
    code you can write:
     hamming.distance(a,b)
      or
     levenshtein.distance(a,b)
 */

var names = ["Jordan Voves", "Keller Chambers", "Stefano Cobelli",
"Jenna Slusar", "Jason Corriveau", "Cole Whitley", "Dylan Zucker",
"Danny Toback", "Eric Marshall", "Allan La", "Natalie Altman",
"Evan Harrington", "Jack Napor", "Jingya Wu", "Christian Ouellette",
"Junjie Jiang", "Morgan Muller", "Sarah Xu", "Aleksandar Antonov",
"Parker Watson", "Haipu Sun", "Ryan Pencak", "Dan Kershner",
"John Venditti", "Jacob Mendelowitz", "Dunni Adenuga", "Jeff Lee",
"Uttam Kumaran", "Jack Hall-Tipping"]


/* STEP 1: SORT NAMES by LAST NAME! */

/* Helper function to arrange by last name */
function compare(a, b) {
  var splitA = a.split(" ");
  var splitB = b. split(" ");
  var lastA = splitA[splitA.length - 1];
  var lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
}

var sortedList = names.sort(compare);
console.log(sortedList);


/* Helper function to check for vowels */
function isVowel(aChar) {
  var result;

  if (aChar == "A" || aChar == "E" || aChar == "I" || aChar == "O" || aChar == "U") {
    result = true;
  } else {
    result = false;
  }

  return result;
}

/* WHILE > 1 students are UNPAIRED
     take 1st student, compute distance to all others,
      pair with lowest score.
      */

/* initializes a variable that will hold the shortest distance */
var shortestDist = 100;

/* initializes a variable that will hold the index at which the right pair is held */
var pairIndex = 0;

/* initializes array to hold pairs */
var pairList = [];

while (sortedList.length > 1) {

  /* initializes a variable that will hold the shortest distance */
  var shortestDist = 100;

  /* initializes a variable that will hold the index at which the right pair is held */
  var pairIndex = 0;

  /* Element at first index of sorted list */
  firstUnpaired = sortedList[0];

  if (isVowel(firstUnpaired.charAt(0))) { /* First character is a vowel */
    for (i = 1; i < sortedList.length; i++) {
      var distance = hamming.distance(firstUnpaired, sortedList[i]);
      if (distance < shortestDist) {
        shortestDist = distance;
        pairIndex = i;
      }
    }
  } else { /* First character is a consonant */
    for (i = 1; i < sortedList.length; i++) {
      var distance = levenshtein.distance(firstUnpaired, sortedList[i]);
      if (distance < shortestDist) {
        shortestDist = distance;
        pairIndex = i;
      }
    }
  }

  var output = firstUnpaired + " + " + sortedList[pairIndex] + " , " + shortestDist;
  pairList.push(output);
  sortedList = sortedList.filter(name => name !== sortedList[pairIndex]);
  sortedList = sortedList.filter(name => name !== firstUnpaired);
  console.log(sortedList);
}
console.log(pairList);