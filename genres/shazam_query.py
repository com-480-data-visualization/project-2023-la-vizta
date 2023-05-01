import pandas as pd
import requests
import time
import json
import os
import re

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

def search_id(title, artist):
    print('Searching for: ' + title + ", " + artist)
    url = "https://shazam.p.rapidapi.com/search"
    query = { "term" : title + ' ' + artist, "offset":"0", "limit":"1" }  
    return get_req(url, query)

def get_genres_id(id):
    url = "https://shazam.p.rapidapi.com/songs/v2/get-details"
    query = { "id": id }
    return get_req(url, query)

def get_genres_title(title, artist):
    s = search_id(title, artist)
    try:
        id = s['tracks']['hits'][0]['track']['hub']['actions'][0]['id']
    except:
        t = re.sub(r" ?\([^)]+\)", "", title)
        return get_genres_title(t, '')
    g = get_genres_id(id)
    genres = g['data'][0]['attributes']['genreNames']
    return genres

def query_tracks(df):
    genress = []
    
    for i, row in df.iterrows():
        genres = get_genres_title(row['title'], row['artist'])
        genress.append(genres)
        time.sleep(2)
    
    df['genres'] = genress
    df.to_csv('./genres_shazam.csv', index=False, mode='a', header=False) 

if __name__ == '__main__':
    cached = pd.read_csv('./cached_db.csv')
    start = pd.read_csv('./genres_shazam.csv')

    samples = 5
    computed = start.shape[0]
    rows = cached.shape[0]

    print(computed, rows)

    for i in range(computed, rows, samples):
        df = cached.take(range(i, i + samples))
        print(i, list(df['region']))
        query_tracks(df)

    