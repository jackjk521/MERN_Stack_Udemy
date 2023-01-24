To use concurrently:

Root folder
    "client": "npm start --prefix", // to cd inside the client folder
    "dev": "concurrently \"npm run server\" \"npm run client\""