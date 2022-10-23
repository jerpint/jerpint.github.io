let w;
let columns;
let rows;
let board;
let next;
let digits_02;
let digits_04;
let digits_05;
let digits_09;
let milliseconds;
let seconds;
let minutes;
let hours;
let digitSize;


async function getData() {

  const res09 = await fetch('/assets/vae/0-9-mnist-vae.json')
  digits_09 = await res09.json();

  const res05 = await fetch('/assets/vae/0-5-mnist-vae.json')
  digits_05 = await res05.json();

  const res02 = await fetch('/assets/vae/0-2-mnist-vae.json')
  digits_02 = await res02.json();

  const res04 = await fetch('/assets/vae/0-4-mnist-vae.json')
  digits_04 = await res04.json();

}


async function setup() {

  // get all frames data for vaes (pre-computed)
  await getData();

  w = 2;
  digitSize = 28;
  let numDigits = 6  // 2 hours + 2 minutes + 2 seconds
  createCanvas(digitSize * w * numDigits, digitSize * w);

  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);

}

function getTime() {

    currentTime = new Date()
    milliseconds = currentTime.getMilliseconds()
    seconds = currentTime.getSeconds()
    minutes = currentTime.getMinutes()
    hours = currentTime.getHours()

    hours = hours % 24
    minutes = minutes % 60

}

function setStroke(fillValue) {
  if (fillValue > 100) { stroke(fillValue) } else { stroke(0) }
}

function setFill(fillValue) {
  let fillFactor = 1
  fill(fillValue * fillFactor);
}

function draw() {
  background(0);
  getTime()
  stroke(0)

  // Display seconds (units)
  let seconds_unit = seconds % 10
  let frame = round(milliseconds / 1000 * 29)
  let pos = 6
  for ( let i = 0; i < digitSize;i++) {
    for ( let j = 0; j < digitSize;j++) {
      let fillValue = digits_09[seconds_unit][frame][j][i];
      let offset = (i+digitSize*(pos-1))

      setStroke(fillValue)
      setFill(fillValue)
      rect(offset * w, j * w, w-1, w-1);
    }
  }

  // Display seconds (tens)
  let seconds_tens = floor(seconds / 10)
  if (seconds_unit == 9){
      frame = round(milliseconds / 1000 * 29)
  } else {
      frame = 0
  }
  pos = 5
  for ( let i = 0; i < digitSize;i++) {
    for ( let j = 0; j < digitSize;j++) {
      let fillValue = digits_05[seconds_tens][frame][j][i];
      let offset = (i+digitSize*(pos-1))

      setStroke(fillValue)
      setFill(fillValue)
      rect(offset * w, j * w, w-1, w-1);
    }
  }


  // Display minutes (units)
  let minutes_unit = minutes % 10
  pos = 4
  // if (seconds_unit == 9 && seconds_tens == 5){
  if (seconds == 59){
      frame = round(milliseconds / 1000 * 29)
  } else {
      frame = 0
  }
  for ( let i = 0; i < digitSize;i++) {
    for ( let j = 0; j < digitSize;j++) {
      let fillValue = digits_09[minutes_unit][frame][j][i];
      let offset = (i+digitSize*(pos-1))

      setStroke(fillValue)
      setFill(fillValue)
      rect(offset * w, j * w, w-1, w-1);
    }
  }


  // Display minutes (tens)
  let minutes_tens = floor(minutes / 10)
  pos = 3
  if (seconds == 59 && minutes_unit == 9){
      frame = round(milliseconds / 1000 * 29)
  } else {
      frame = 0
  }
  for ( let i = 0; i < digitSize;i++) {
    for ( let j = 0; j < digitSize;j++) {
      let fillValue = digits_05[minutes_tens][frame][j][i];
      let offset = (i+digitSize*(pos-1))

      setStroke(fillValue)
      setFill(fillValue)
      rect(offset * w, j * w, w-1, w-1);
    }
  }

  // Display hours (units)
  let hours_unit = hours % 10
  pos = 2
  if (minutes == 59 && seconds == 59){
      frame = round(milliseconds / 1000 * 29)
  } else {
      frame = 0
  }
  for ( let i = 0; i < digitSize;i++) {
    for ( let j = 0; j < digitSize;j++) {

      let fillValue = digits_09[hours_unit][frame][j][i];
      if (hours > 20) {
          fillValue = digits_04[hours_unit][frame][j][i];
      }

      let offset = (i+digitSize*(pos-1))

      setStroke(fillValue)
      setFill(fillValue)
      rect(offset * w, j * w, w-1, w-1);
    }
  }

  // Display hours (tens)
  let hours_tens = floor(hours / 10)
  pos = 1
  if (hours_unit == 9 && minutes == 59 && seconds == 59){
      frame = round(milliseconds / 1000 * 29)
  } else {
      frame = 0
  }
  for ( let i = 0; i < digitSize;i++) {
    for ( let j = 0; j < digitSize;j++) {
      let fillValue = digits_02[hours_tens][frame][j][i];
      let offset = (i+digitSize*(pos-1))

      setStroke(fillValue)
      setFill(fillValue)
      rect(offset * w, j * w, w-1, w-1);
    }
  }

  // Display seconds separator
  pos = 5
  for ( let i = 0; i < 2;i++) {
    for ( let j = 0; j < 2;j++) {
      let offset = (i+digitSize*(pos-1))
      fill(200);
      stroke(200)
      rect(offset * w, (j+8) * w, w-1, w-1);
      rect(offset * w, (j+20) * w, w-1, w-1);
    }
  }

  // Display minutes separator
  pos = 3
  for ( let i = 0; i < 2;i++) {
    for ( let j = 0; j < 2;j++) {
      let offset = (i+digitSize*(pos-1))
      fill(200);
      stroke(200)
      rect(offset * w, (j+8) * w, w-1, w-1);
      rect(offset * w, (j+20) * w, w-1, w-1);
    }
  }

}
