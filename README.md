# Project of Data Visualization (COM-480)

| Student's name  | SCIPER |
| --------------  | ------ |
| Nathan Maire    | 313202 |
| Edouard Lacroix | 313192 |
| Nicolas Jimenez | XXXXXX |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (23rd April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).

We will use 3 sources of data for this project, they are listed below:
1. [Spotify Charts](https://www.kaggle.com/datasets/dhruvildave/spotify-charts?resource=download) containing all the "Top200" and "Viral50" categories published by spotify and available on their app as playlists.
2. [Shazam API](https://rapidapi.com/apidojo/api/shazam) which is also a great resource to query data about tracks, albums or artists and we will use it as a complement to the spotify data.
3. [OpenStreetMap](https://www.openstreetmap.org/#map=9/46.8246/8.2245) dataset containing geometries of countries, and much more (which we will not use in our case). 

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

The main topics we want to address are the following:
- Explore the geographical trends in music
- Discover new titles
- Analyse the music trends over time 

All of us are passionate about music, we have been using Spotify, Souncloud, Shazam and others for years now. We enjoy discovering new songs frequently and share our passion. 
Nevertheless, finding new musics or artists is difficult and the recommendations algorithm used by the apps enumerated earlier are still far from perfect. Moreover, these algorithms tend to 
always recommend what we "want" to hear - similar titles as the ones that are already in our playlists. This is were our project comes to life: building an app - a tool - that will allow anyone to discover new genres and new artists in a visual and entertaining manner. 

More concretely, we would like to display a map of the world. Data could be shown as shapes, popups, graphs, colors as well as text. 
The website will consist of a map where each country will have:
- a color correspoding to the most listened genre 
- a popup on clickEvent with the top 5 most streamed tracks and a chart to naviguate and see the evolution of their streams over time.
Moreover, we would like to add ... (filter) 

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

###### Spotify Charts
"Top200" and "Viral50" charts are refreshed every 2-3 days and data has been collected since 2017 summing it up to around 3.5GB of data. 

Each row contains: (title, rank, date, artists, url, region, chart, trend, streams)

We are going to focus only on:
- The "title": title of the music ( waka waka )
- The "rank": the rank of the song between the top200 or viral50
- The "artists": the artists on the song 
- The "region": the country ( Germany )
- The “chart”: either ‘top200’ (=200 most streamed song) or ‘viral50’ (=50 most viral songs)
- The "streams": the music streams


Virality is mesure with the streams, the saves in playlist, shares and time listened on a timeframe given (1 day, 1 week ...)
Number of rows in the dataset: XX
Number of countries represented: 69 + “global” (world)


### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

