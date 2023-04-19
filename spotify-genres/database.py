
from psycopg2.extras import execute_values

import pandas as pd
import psycopg2
import os

from dotenv import load_dotenv
load_dotenv()

host = os.getenv('DB_HOST')
port = os.getenv('DB_PORT')
user = os.getenv('DB_USERNAME')
pwd = os.getenv('DB_PASSWORD')


def connect_db(database, user, pwd, host, port):
    print("\nConnecting to database ", host)
    return psycopg2.connect(database=database, user=user, password=pwd, host=host, port=port) 
    
def disconnect_db(conn, cursor):
    if conn:
        cursor.close()
        conn.close()
        print("database connection is closed")

def query_db(callback):
    conn = connect_db('postgres', user, pwd, host, port)
    cur = conn.cursor()
    res = callback(conn, cur)
    disconnect_db(conn, cur)
    return res

def select_db(query, args=None):
    def callback(conn, cur):
        return pd.read_sql(query, conn, params=args, coerce_float=True)
    return query_db(callback)

def insert_db(query, args):
    print('Inserting to PostGIS: ', query)
    def callback(conn, cur):
        try:
            # query_args = ','.join(cur.mogrify("(%s, %s, ST_GeomFromGeoJSON(%s))", i).decode('utf-8') for i in args)
            # cur.execute(query + (query_args)) # execute_values(cur, query, args)
            execute_values(cur, query, args)
            conn.commit()
        except Exception as e:
            print(e)
    query_db(callback)