import requests
req = requests.post("http://localhost:3000/api/meal/add/", json = {"id": "1"})
print("HI")
