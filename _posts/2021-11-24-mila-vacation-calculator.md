---
title: "Vacation Calculator ✈️"
date: 2021-11-24T00:00:00-05:00
excerpt: "Useful tool for Mila employees to count their cumulated vacation days"
categories:
  - blog
tags:
  - tool
classes: wide
header:
  - image: "/assets/images/photo-jer-mila_square.jpg"
---

I always get confused with Mila's vacation system, so I made an easy-to-use vacation days calculator.

You can also forecast how much vacation you'll have accumulated on a future date. Ideal for planning your next trip 😎


<head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/duet.esm.js"></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/duet.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/themes/default.css" />
</head>
 

<html>
<body>
Available days in Folks: <input type="number" step="any" min="-100" max="100" value="0" id="cumulatedDays">
<p></p>
<p></p>

Vacation days per year: <input type="number" step="any" min="0" max="100" value="0" id="yearlyVacationDays">
<p></p>
<p></p>

<label for="date">Day on which you will go on vacation</label>
<duet-date-picker identifier="vacation-date"></duet-date-picker>

<p></p>
<p></p>

<label for="start-date">Start Date (For new employees only - optional)</label>
<duet-date-picker identifier="start-date"></duet-date-picker>

<p></p>
<p></p>

<button onclick="getVacationDays()">Calculate!</button>
<div id = "vacation"></div>

<script>
function getVacationDays() {

  var current_date = new Date();
  var currentMonth = Number(current_date.getMonth()) + 1 // months are indexed 0-11 in js, +1 to avoid confusion.
  var currentYear = Number(current_date.getYear()) - 100 + 2000 // current year in 20XX format
  var vacationDate = document.querySelector("duet-date-picker[identifier='vacation-date']")
  if (vacationDate.value === "") {
      // if no value selected, get the current date instead
      var vacationMonth = currentMonth // current month
      var vacationYear = currentYear // current year

  } else {
      var vacationMonth = Number(vacationDate.value.split('-')[1])
      var vacationYear = Number(vacationDate.value.split('-')[0])
  }

  // get the date of the last tally in folks (usually the last May 1st)
  folksMonth = 5
  if (currentMonth < folksMonth) {
      var folksYear = currentYear - 1
  } else {
      var folksYear = currentYear
  }

  // Check if a start date was specified and correct for it
  var startDate = document.querySelector("duet-date-picker[identifier='start-date']")
  if (startDate.value != "") {
      var startMonth = Number(startDate.value.split('-')[1])
      var startYear = Number(startDate.value.split('-')[0])
      var startOffset =  startMonth + startYear * 12 - folksMonth - folksYear*12
      if (startOffset < 0) {
          startOffset = 0  // start date was before last folks tally so ignore it
      }
  } else {
      var startOffset = 0 // no offset to begin with
  }
  

  var daysperYear = Number(document.getElementById("yearlyVacationDays").value) // Days worked of the current month
  var cumulatedDays = Number(document.getElementById("cumulatedDays").value)
  var daysPerMonth = (daysperYear / 12) // number of vacation days you bank per month
  var monthsElapsed = vacationYear * 12 + vacationMonth - folksYear * 12 - folksMonth - startOffset
  var result = cumulatedDays + monthsElapsed * daysPerMonth
  document.getElementById("vacation").innerHTML = "Accumulated Vacation Days: " + result.toPrecision(3)
  document.getElementById("vacation").style.visibility='visible'

}
</script>
</body>
</html>

## How it works

It counts how many months you've accumulated since the last update on Folks and adds that to your vacation total. 
A month is only counted once it is completed, so for a given day of a month, the total doesn't change. This is the unofficial Mila way of counting.

The final count is then obtained by:

```
Total Days = Days in Folks + Months Elapsed * Vacation Days per Month
```
