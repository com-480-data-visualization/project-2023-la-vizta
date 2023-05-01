import os
import spotipy
from tqdm import tqdm
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

manager = SpotifyClientCredentials(CLIENT_ID, CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=manager)


def fetch_genres(ids: list):
    genres1 = genres2 = genres3 = []
    def add_genres(genresList, newGenres, i):
        if len(newGenres) >= i + 1:
            genresList.append(newGenres[i])
        else:
            genresList.append(None)

    def add_all_genres(newGenres):
        add_genres(genres1, newGenres, 0)
        add_genres(genres2, newGenres, 1)
        add_genres(genres3, newGenres, 2)
        print(newGenres, genres1, genres2, genres3)

    for id in tqdm(ids):
        track = sp.track(id)
        albums_id = track['album']['id']
        album = sp.album(albums_id)
        if len(album['genres']) > 0:
            add_all_genres(album['genres'])
        else:
            artist_id = track['artists'][0]['id']
            artist = sp.artist(artist_id)
            add_all_genres(artist['genres'])
    return genres1, genres2, genres3