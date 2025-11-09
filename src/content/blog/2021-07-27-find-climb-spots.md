---description: Get an email alert when a spot frees up at the climbing gym using python,
  pandas and sendgrid.
pubDate: 2021-07-27 00:00:00-05:00
title: "Climbing Spot Finder\U0001F9D7\U0001F916"
---

## TL;DR
Get an email alert when a spot frees up at the climbing gym using python, pandas and sendgrid.

## Finding Climb Spots

I have been climbing for a while now. It's safe to say I'm seriously addicted.
Ever since Covid, you have to book your spot ahead of time - spots are limited and fill up quick, especially in the evenings.

This ends up happening way too often:

<img src="https://user-images.githubusercontent.com/18450628/127053661-2d4f2382-b6fe-4a69-9630-c38a3733bacc.png" alt="bookings" width="400" align="middle"/>

... by the time I'm ready to reserve, all the good spots are booked.


What do you do? Refresh constantly throughout the day and hope you land a spot? Surely there must be a better way.
So I decided to setup a python bot that automatically emails me as soon as a spot becomes available. How hard can it be?

## Finding Spots

The first step was to find out how to get the information I needed without needing to go directly to the web page.
Using Firefox's inspect tool, I looked at the network requests hoping that it would show me what API the website was using.
It worked!

![how_it_works](https://user-images.githubusercontent.com/18450628/127056836-bc57d8b3-3226-4c81-9af8-6403fc08a956.gif)

We can see that clicking the button makes a `POST` request to the following `URL`:

```
"https://app.rockgympro.com/b/widget/?a=equery"
```

In the data sent over, there is a `show_date` parameter with the date I requested.
So, we make a `POST` request to the URL, and we can adjust the `show_date` parameter. Great!
All the other header parameters are a bit obscure, and when I tried to remove them, the API yelled at me, so I kept them as-is.

We can fetch the raw data using the `requests` library:

```python
import requests

def fetch_data(date_str):
    """
    Fetch the raw data from the website hosting the information.

    date_str (str): day to climb at, expressed in format YYYY-MM-DD
    """
    url = "https://app.rockgympro.com/b/widget/?a=equery"

    data = {
        "show_date": date_str,
        "PreventChromeAutocomplete": "",
        "random": "60feea89d7a01",
        "iframeid": "rgpiframe60feea88d990c",
        "mode": "e",
        "fctrl_1": "offering_guid",
        "offering_guid": "fc473e424ba64f0b9bf5063dd07054a1",
        "fctrl_2": "course_guid",
        "course_guid": "",
        ...
        # show_date is the only important parameter.
        # The rest of the data is required for the request to work,
        # but I'm not sure what all of it does.
    }
    return requests.post(url, data=data)
```

## Parse the data

The next step is to parse the raw html tables we get with times and availabilities. I used a little pandas voodoo to parse it all into a dictionary.

```python
def extract_availabilities(resp):
    """
    Convert the response to a dict:
        availabilities = {
            time_slot (str): is_available (bool)
    }
    """

    # extract the availabilities raw html table and convert it to a pandas dataframe
    raw_fields = pd.read_html(resp.json()["event_list_html"])[0]

    # pandas voodoo to extract dates and availabilities
    processed_fields = raw_fields.apply(
        lambda x: {
            x[0].split("to")[0].split(",")[2].strip(" "): x[1]
            in ["AvailabilityAvailable", "Availability2 spaces"]
        },
        axis=1,
    ).values

    # combine final results into a single dict
    availabilities = {}
    for y in processed_fields:
        availabilities = {**availabilities, **y}

    return availabilities
```

## Setting up email

Next, we want to get an email when we find a spot.  I used `sendgrid` which has a python API and allows you to send a certain amount of emails for free.
You have to register an account and get an API key for the email sending to work, but other than that it was pretty quick and convenient to set up.

```python
def send_email_func(
    html_content, from_email, to_emails, subject,
):
    message = Mail(
        from_email=from_email,
        to_emails=to_emails,
        subject=subject,
        html_content=html_content,
    )
    try:
        sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)
```


## Tying it all together

Finally, we sprinkle in a little more logic to tie it all together nicely and specify the dates we're interested in:

```python
def find_climbing_spots(date, time_slots, refresh_rate=20, send_email=True):
    """
    Find a climbining spot on a given date for given times.

    date (datetime.date): Day, month, year in a datetime format
    time_slots list[(str)]: Times of day to climb at e.g. ['7 PM', '7:30 PM']
    refresh_rate (int): Time (in seconds) to wait before refreshing the page again
    seng_email (bool): Send an email if a spot is found
    """

    date_str = f"{date.year:4d}-{date.month:02d}-{date.day:02d}"
    count = 0
    spot_found = False
    while not spot_found:
        # Only refresh the page once every $refresh_rate seconds, avoid spamming
        if count > 0:
            time.sleep(refresh_rate)

        try:
            resp = fetch_data(date_str)
        except requests.exceptions.RequestException:
            print("Something went wrong fetching the page. Will try again...")
            continue

        if resp.ok:
            availabilities = extract_availabilities(resp)
            email_content = check_available_slots(
                availabilities, time_slots, date_str
            )

        spot_found = False if email_content == "" else True

        if spot_found:
            print(email_content)
            if send_email:
                send_email_func(
                    html_content=email_content,
                    subject="Nice, you can climb!",
                    from_email="jerpint@gmail.com",
                    to_emails=["jerpint@gmail.com"],
                )
                print("\nEmail sent!")
        else:
            count += 1
            print(f"Refreshing in {refresh_rate} seconds. Refresh count: {count}", end="\r")

```

Now we just invoke the function with the days we want to climb at:

```python
find_climbing_spots(
    date=date(year=2021, month=7, day=29),
    time_slots=["6 PM", "6:30 PM", "7 PM", "7:30 PM",],
    refresh_rate=30,
    send_email=True,
)
```

## Get the code

The full version of the code can be found [here](https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/reserve_climb.ipynb).
All you have to do is source your sendgrid API keys before running.

Enjoy!

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/reserve_climb.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="/src/assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>
