# Project of Data Visualization (COM-480)

| Student's name  | SCIPER |
| --------------  | ------ |
| Nathan Maire    | 313202 |
| Edouard Lacroix | XXXXXX |
| Nicolas Jimenez | 283057 |

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
# EDOU -> MORE ON THIS
.... The website will consist of a map with colors related to genre and popups to show tracks and genres that have been the most streamed per country. 

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

###### Spotify Charts
"Top200" and "Viral50" charts are refreshed every 2-3 days and data has been collected since 2017 summing it up to around 3.5GB of data. 

Each row contains: (title, rank, date, artists, url, region, chart, trend, streams)
The “chart” column is for the ‘top200’ (=200 most streamed song) and ‘viral50’ (=TODO)
Our focus will mostly be on the region (=country) and streams.
Number of rows in the dataset: XX
Number of countries represented: 69 + “global” (world)


### Related work


> - What others have already done with the data?

We saw that multiple other projects were done with this spotify dataset. The three we looked at were from the kaggle database. 
The first one is a simple exloratory data analysis where they try to understand the key informations. 
https://www.kaggle.com/code/dhruvildave/spotify-charts-exploratory-data-analysis
The second one is an exploratory data analysis that only focus on Taylor Swift. 
https://www.kaggle.com/code/aneridalwadi/exploratory-data-analysis-taylor-swift/notebook

> - Why is your approach original?

We are taking an original approach because we are integrating multiple datasets such as the Shazam one to add key information on the charts that is not present in the spotify dataset. Furthermore, our visualisation is very different from them since we are integrating a map. Finally, our goal is not just to give raw information to the user but in an interactive way.

> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

We looked specially at maps because we wanted to have something by countries. We used the following two data maps as examples for our project.

https://public.tableau.com/app/profile/andr.oliveira8781/viz/Banksy/Home

http://www.puffpuffproject.com/languages.html

> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

