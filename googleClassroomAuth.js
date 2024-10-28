// Install dependencies first by running: npm install express google-auth-library mongodb dotenv

const express = require("express");
const { MongoClient } = require("mongodb");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

// Set up Express
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection settings
const mongoURI = "mongodb+srv://admin:admin@cluster0.lv5o6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "TeachersPet";
const collectionName = "tokens";
let db;

// Google OAuth2 settings
const clientId = "719533638212-nsi6gd0rgcpeb8opiq8emoqieq4bdh85.apps.googleusercontent.com";
const clientSecret = "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"; // Set this in a .env file
const redirectUri = "http://localhost:3000/auth/google/callback"; // OAuth callback

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

// Connect to MongoDB
async function connectToMongo() {
    const client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
}

// Route to start Google OAuth
app.get("/auth/google", (req, res) => {
    const scopes = [
        "https://www.googleapis.com/auth/classroom.courses.readonly",
        "https://www.googleapis.com/auth/classroom.rosters.readonly"
    ];

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline", // Allows refresh token
        scope: scopes,
        prompt: "consent" // Forces consent screen every time
    });

    res.redirect(authUrl);
});

// OAuth callback route
app.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send("Authorization code is missing");
    }

    try {
        // Exchange code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Store token in MongoDB
        const tokenCollection = db.collection(collectionName);
        const tokenDoc = { access_token: tokens.access_token, refresh_token: tokens.refresh_token, expiry_date: tokens.expiry_date };
        await tokenCollection.insertOne(tokenDoc);

        res.send("Authentication successful! Tokens have been stored in the database.");
    } catch (error) {
        console.error("Error exchanging code for tokens:", error);
        res.status(500).send("Authentication failed");
    }
});

// Main entry
(async () => {
    await connectToMongo();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})();
