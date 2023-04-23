
import time
import pandas as pd
from dotenv import load_dotenv
load_dotenv()

from database import insert_db_from_df, select_db


def import_spotify_table():
    query = f"select title, artist, date, rank, url as id, region, streams from spotify_charts where chart='top200' and rank < 50 and date >= '01-01-2021' order by (region, date, rank)"
    df = select_db(query)
    df['id'] = df['id'].apply(lambda x: x.replace('https://open.spotify.com/track/', ''))
    df.to_csv('./cached_table.csv', index=False) 
    return df

def get_unique_tracks():
    df = pd.read_csv('./cached_table.csv')
    df = df.drop_duplicates(subset=['id'], keep='first')
    df = df.drop(['date', 'region', 'streams', 'rank'], axis=1)
    df.to_csv('./unique_tracks.csv', index=False) 
    return df

def insert_unique_tracks():
    df = pd.read_csv('./unique_tracks.csv')
    df = df[['id', 'title', 'artist']]
    query = "INSERT INTO tracks(id, title, artist) VALUES %s"
    insert_db_from_df(query, df)
    return df

def select_unique_tracks():
    df = select_db("select * from tracks order by id limit 10")
    return df

def insert_spotify_clean():
    df = pd.read_csv('./cached_table.csv')
    df = df.drop(['title', 'artist'], axis=1)
    df = df[['id', 'date', 'rank', 'region', 'streams']]
    query = "INSERT INTO spotify_clean(id, date, rank, region, streams) VALUES %s"
    insert_db_from_df(query, df)
    return df

def select_spotify_clean():
    df = select_db("select * from spotify_clean limit 10")
    return df

funcs = [
    import_spotify_table,
    get_unique_tracks,
    insert_unique_tracks,
    select_unique_tracks,
    insert_spotify_clean,
    select_spotify_clean
]
for func in funcs:
    print(func.__name__)
    df = func()
    print(df.shape, '\n')
    time.sleep(1)