import psycopg2

def fetch_all_datasets():
    # Initialize connection
    conn = psycopg2.connect(
        host="",
        port="",
        dbname="",
        user="",
        password="",
        sslmode="require"
    )

    # Initialize a cursor
    cur = conn.cursor()

    # Execute SQL query to fetch data
    cur.execute("SELECT id, study_title, publication_date, nsamples, organism, experimental_conditions, environment, exposure_duration, control, link FROM datasets")
    
    # Fetch all rows
    rows = cur.fetchall()
    # Fetch column names from the cursor description attribute
    column_names = [desc[0] for desc in cur.description]

    # Convert the query result to JSON
    json_output = []

    for row in rows:
        row_dict = {}
        for i in range(0, len(column_names)):
            row_dict[column_names[i]] = row[i]
        json_output.append(row_dict)

    # Close the cursor and connection
    cur.close()
    conn.close()


    return json_output

####################################################################################

def fetch_all_datasets_for_model():
    # Initialize connection
    conn = psycopg2.connect(
        host="",
        port="",
        dbname="",
        user="",
        password="",
        sslmode="require"
    )

    # Initialize a cursor
    cur = conn.cursor()

    # Execute SQL query to fetch data
    cur.execute("SELECT id, study_title, publication_date, nsamples, organism, experimental_conditions, environment, exposure_duration, control, link FROM datasets")
    
    # Fetch all rows
    rows = cur.fetchall()
    # Fetch column names from the cursor description attribute
    column_names = [desc[0] for desc in cur.description]

    # Convert the query result to JSON
    json_output = []

    for row in rows:
        row_dict = {}
        for i in range(0, len(column_names)):
            row_dict[column_names[i]] = row[i]
        json_output.append(row_dict)

    # Close the cursor and connection
    cur.close()
    conn.close()


    return json_output

####################################################################################

def fetch_datasets_with_id(id):
    # Initialize connection
    conn = psycopg2.connect(
        host="",
        port="",
        dbname="",
        user="",
        password="",
        sslmode="require"
    )

    # Initialize a cursor
    cur = conn.cursor()

    # Execute SQL query to fetch data
    cur.execute("SELECT * FROM datasets WHERE id = %s", (id,))
    
    # Fetch all rows
    rows = cur.fetchall()
    # Fetch column names from the cursor description attribute
    column_names = [desc[0] for desc in cur.description]

    # Convert the query result to JSON
    json_output = []

    for row in rows:
        row_dict = {}
        for i in range(0, len(column_names)):
            row_dict[column_names[i]] = row[i]
        json_output.append(row_dict)

    # Close the cursor and connection
    cur.close()
    conn.close()


    return json_output

####################################################################################

def fetch_all_model_data():
    # Initialize connection
    conn = psycopg2.connect(
        host="",
        port="",
        dbname="",
        user="",
        password="",
        sslmode="require"
    )

    # Initialize a cursor
    cur = conn.cursor()

    # Execute SQL query to fetch data
    cur.execute("SELECT * FROM models")
    
    # Fetch all rows
    rows = cur.fetchall()
    # Fetch column names from the cursor description attribute
    column_names = [desc[0] for desc in cur.description]

    # Convert the query result to JSON
    json_output = []

    for row in rows:
        row_dict = {}
        for i in range(0, len(column_names)):
            row_dict[column_names[i]] = row[i]
        json_output.append(row_dict)

    # Close the cursor and connection
    cur.close()
    conn.close()


    return json_output

####################################################################################

import openai
import json

openai.api_key = 'sk-...'

####################################################################################

def gpt_query(user_query, dataset_json):
    # Combine user query and dataset into the prompt
    # prompt = f"User Query: {user_query}\nDatasets: {json.dumps(dataset_json)}\nMost relevant dataset name and features in natural language:"
    
    prompt = f"Given the user query '{user_query}', find the most relevant dataset from the following rows of datasets: \
Please suggest the most relevant dataset along with a short reasoning. Also, give the link to the dataset.\
{dataset_json}"



    # Generate the text using OpenAI library
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",  # You can use other engines like "davinci-codex"
        prompt=prompt,
        temperature=0,  # You can tune this down to get more "reasonable" text
        max_tokens=500  # You can set this to any reasonable value you desire
    )
    
    return response.choices[0].text.strip()

###################################################################################

def ask_model_for_dataset(user_query, dataset_json):

    prompt = f"Given the user query '{user_query}', find the most relevant dataset from the following rows of datasets: \
Please suggest the most relevant dataset along with a short reasoning. Also, give the link to the dataset.\
{dataset_json}"

    model_engine = "gpt-3.5-turbo-16k"  # You can use other engines like "text-davinci-002"
    messages = [
        {"role": "system", "content": "You are a helpful assistant, answering in natural language. Your task is to find the most relevant dataset for the user query. You choose this dataset from the datasets provided to you."},
        {"role": "user", "content": prompt}
    ]

    response = openai.ChatCompletion.create(
        model=model_engine,
        messages=messages,
        max_tokens=1000
    )

    return response['choices'][0]['message']['content'].strip()

###################################################################################

def ask_model_for_model_with_dataset(dataset_json, model_json):

    prompt = f"Given this dataset '{dataset_json}', find the most relevant models to use with it from the following rows of models: \
Please suggest the most relevant models to use along with a short reasoning. Also, give the link to the model.\
{model_json}"

    model_engine = "gpt-3.5-turbo-16k"  # You can use other engines like "text-davinci-002"
    messages = [
        {"role": "system", "content": "You are a helpful assistant, answering in natural language. Your task is to find the most relevant dataset for the user query. You choose this dataset from the datasets provided to you."},
        {"role": "user", "content": prompt}
    ]

    response = openai.ChatCompletion.create(
        model=model_engine,
        messages=messages,
        max_tokens=1000
    )

    return response['choices'][0]['message']['content'].strip()

###################################################################################


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for localhost:5173 
origins = [ 
    "http://localhost:5173", 
    "http://localhost:5173/",
    "http://127.0.0.1:5173", 
    "http://127.0.0.1:5173/",
    "https://bens-bio-archive-m6s7a.ondigitalocean.app/",
    "https://bens-bio-archive-m6s7a.ondigitalocean.app",
    "https://bensbioarchive.com",
    "http://bensbioarchive.com"
] 
 
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"],  # You can specify specific HTTP methods (e.g., ["GET", "POST"]) 
    allow_headers=["*"],  # You can specify specific HTTP headers if needed 
)

####################################################################################

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/ping")
def pong():
    return {"message": "pong"}

@app.get("/query/")
def query_for_datasets(query_string: str = None):
    if query_string is None:
        return {"error": "No query provided"}
    user_query = query_string
    dataset_list = fetch_all_datasets_for_model()
    # answer = gpt_query(user_query, dataset_list)
    answer = ask_model_for_dataset(user_query, dataset_list)
    if query_string is None:
        return {"error": "No query provided"}
    return {"answer": answer}

@app.get("/get_all_space_data/")
def get_all_space_data():
    data = fetch_all_datasets()
    return data

@app.get("/get_space_data_with_id/")
def get_space_data_with_id(id: int = None):
    if id is None:
        return {"error": "No id provided"}
    data = fetch_datasets_with_id(id)
    return data

@app.get("/get_all_model_data/")
def get_all_model_data():
    data = fetch_all_model_data()
    return data

@app.get("/query_model/")
def query_for_models(id: int = None):
    if id is None:
        return {"error": "No id provided"}
    dataset_list = fetch_datasets_with_id(id)
    model_list = fetch_all_model_data()
    answer = ask_model_for_model_with_dataset(dataset_list, model_list)
    return {"answer": answer}