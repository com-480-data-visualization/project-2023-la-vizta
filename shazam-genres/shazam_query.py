
import pandas as pd
import requests
import json
import os

from dotenv import load_dotenv
load_dotenv()

SHAZAM_API_KEY = os.getenv('SHAZAM_API_KEY')

headers = {
	"X-RapidAPI-Key": SHAZAM_API_KEY,
	"X-RapidAPI-Host": "shazam.p.rapidapi.com"
}

def get_req(url, query):
    res = requests.request("GET", url, headers=headers, params=query)
    return json.loads(res.text)

def search(title, artist):
    print('Searching for: ' + title + ", " + artist)
    url = "https://shazam.p.rapidapi.com/search"
    query = { "term" : title + ' ' + artist, "offset":"0", "limit":"1" }  
    return get_req(url, query)

def get_genre(id):
    print('Getting genre for: ' + id)
    url = "https://shazam.p.rapidapi.com/songs/v2/get-details"
    query = { "id": id }
    return get_req(url, query)

if __name__ == '__main__':
    df = pd.read_csv('top_tracks.csv')
    data = df.copy()
    all_genres = [[] for i in range(df.shape[0])]

    for i, row in df.iterrows():
        s = search(row['title'], row['artist'])
        id = s['tracks']['hits'][0]['track']['hub']['actions'][0]['id']
        g = get_genre(id)
        genres = g['data'][0]['attributes']['genreNames']
        all_genres[i] = genres

        data['genres'] = all_genres
        data.to_csv('data.csv', index=False)  