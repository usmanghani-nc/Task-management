sam local start-api

sam local invoke "Ratings" -e event.json

sam build

sam deploy