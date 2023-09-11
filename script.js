"use strict";

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


  const resolvedResponses = results.filter(promise =>
    promise.status === 'fulfilled' && promise.value.ok)
    .map(prom => prom.value);

  const rejectedReponses = results.filter(promise => !promise.value.ok)
    .map(prom => prom.value);

  // console.log(rejectedReponses);

  // const fulfilledArr = await resolvedResponses.map(async function (res) {
  //   return await res.json();
  // });
  const rejectedArr = [];

  const fulfilledArr = [];

  for (const res of resolvedResponses) {
    const data = await res.json();
    fulfilledArr.push(data.text);
  }

  for (const res of rejectedReponses) {
    // const data = await res.text();
    rejectedArr.push(res.statusText);
  }

  console.log("showNumberAll fulfilled: ", fulfilledArr);
  console.log("showNumberAll rejected: ", rejectedArr);
}


// showNumberAll();

/** main: call all 3 showNumber functions. */
async function main() {
  await showNumberTrivia(17);
  await showNumberRace(1, 2, 3, 4);
  await showNumberAll();
}

// main();
