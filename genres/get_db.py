
from database import select_db


def get_musics_for_genres():
    query = f"""
    select * from (
        select *, row_number() over (partition by "region" order by "streams" desc) as "rank"
        from (
            SELECT title, artist, region, url, sum(streams) as streams
            FROM spotify_charts
            WHERE date >= '2021-01-01' and chart = 'top200' and "region" != 'Global'
            group by title, artist, url, region
            order by sum(streams) desc
        ) titles
    ) titles_2
    where "rank" <= 5
    """
    res = select_db(query)
    res.to_csv('./cached_db.csv', index=False) 

if __name__ == '__main__':
    get_musics_for_genres()