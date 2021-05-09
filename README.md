
start commands:

    yarn client => start client on port 3000

    yarn server => start server on port 5000



env variables needed:

    - server:
        
        - MONGO_URI=mongodb://localhost:27017/communicArt
        - SESSION_SECRET=[put some random characters here]
        - ACCESS_TOKEN_SECRET=[put some random characters here]

    - client:

        -  REACT_APP_SERVER_URL=http://[put your ipv4 address here]:5000

