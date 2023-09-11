"use strict";

const BASE_URL = '';


/** showNumberTrivia: sends request to Numbers API for data on speific number
 * Logs string of trivia for that number to the console.
 */
async function showNumberTrivia(num) {
  const fact1 = await fetch(`http://numbersapi.com/${num}?json`);
  const fact1Data = await fact1.json();

  console.log("fact1Data is", fact1Data.text);
}

// showNumberTrivia(17);





/** showNumberRace: Sends 4 requests to Numbers API and which ever resolves first,
 * will print the trivia for the first promise to resolve.
 */
async function showNumberRace(num1, num2, num3, num4) {
  const res1 = fetch(`http://numbersapi.com/${num1}?json`);
  const res2 = fetch(`http://numbersapi.com/${num2}?json`);
  const res3 = fetch(`http://numbersapi.com/${num3}?json`);
  const res4 = fetch(`http://numbersapi.com/${num4}?json`);

  const winnerPromise = await Promise.race([res1, res2, res3, res4]);

  const winnerData = await winnerPromise.json();

  console.log("Winner Trivia is", winnerData.text);
}

// showNumberRace(24, 31, 5, 8);








/** showNumberAll: sends requests about different numbers to Numbers API.
 * Logs an array of resolved trivia, and an array of error messages from rejected promises.
  */
async function showNumberAll() {
  const res1 = fetch(`http://numbersapi.com/32?json`);
  const res2 = fetch(`http://numbersapi.com/2?json`);
  const res3 = fetch(`http://numbersapi.com/432?json`);
  const res4 = fetch(`http://numbersapi.com/WRONG?json`);

  // arr of objs describing what happened
  const results = await Promise.allSettled([res1, res2, res3, res4]);

  const resolvedResponses = results.filter(result =>
    result.status === 'fulfilled' && result.value.ok)
    .map(result => result.value);

  const rejectedReponses = results.filter(result => !result.value.ok)
    .map(result => result.value);


  const validPromises = resolvedResponses.map(res => res.json());
  const invalidStatusTexts = rejectedReponses.map(res => `Request failed with status code ${res.status}`);

  const fulfilledArr = await Promise.all(validPromises);

  console.log("showNumberAll fulfilled: ", fulfilledArr);
  console.log("showNumberAll rejected: ", invalidStatusTexts);
}


showNumberAll();

/** main: call all 3 showNumber functions. */
async function main() {
  await showNumberTrivia(17);
  await showNumberRace(1, 2, 3, 4);
  await showNumberAll();
}

// main();
