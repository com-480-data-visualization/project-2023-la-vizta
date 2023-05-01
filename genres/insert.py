import json
import pandas as pd
from database import insert_db_from_df


def insert_genres():
    df = pd.read_csv('./data_processed_shazam.csv')
    df = df[['id', 'region', 'streams', 'rank', 'genres']]
    query = "INSERT INTO new_genres(id, region, streams, rank, genres) VALUES %s"
    insert_db_from_df(query, df)

if __name__ == '__main__':
    insert_genres()