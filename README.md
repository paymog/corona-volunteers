A site for helping people self-organize for the coronavirus pandemic of 2020.

The site currently exists at https://corona-volunteers.appspot.com/

To play with this:

1. `cd api`
2. active a virtual environment
3. `pip install -r requirements.txt`
4. `python main.py`

In another terminal

1. `cd client`
2. `yarn install`
3. `yarn start`

---
to deploy this in GAE. First set up an App Engine project and make sure you have the local `gclou` correctly configured to point to your project.

1. `cd client`
2. `yarn build`
3. `gcloud app deploy client.yaml`
4. wait
5. `cd ../api`
6. `gcloud app deploy api.yaml`
7. wait
8. `cd ..`
9. `gcloud app deploy dispatch.yaml`
10. wait
11. Visit the link from the client deployment
