import requests
import json

# the url of your GraphQL server
url = 'http://localhost:4000/graphql'

# the GraphQL query
query = """
query {
    allUsers {
        userID
        name
        phone
    }
}
"""
# in case you have variables
variables = {}

# the headers for your request
headers = {'Content-Type': 'application/json'}

# make the request
response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)

# parse the response
data = json.loads(response.text)

# just print the data for now
print(json.dumps(data, indent=4))
