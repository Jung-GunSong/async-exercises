async function showNumberTrivia() {
  const fact1 = await fetch("http://numbersapi.com/17?json");
  console.log(fact1);
  const fact1Data = await fact1.json();
  const fact1Text = fact1Data.text
  console.log("fact1Data is ", fact1Text)
}

showNumberTrivia();
