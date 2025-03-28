/**
 * Imports
 */
import configNodeEnv from './src/middleware/node-env.js';
import express from "express";
import fileUploads from './src/middleware/file-uploads.js';
import homeRoute from './src/routes/index.js';
import layouts from './src/middleware/layouts.js';
import path from "path";
import { configureStaticPaths } from './src/utils/index.js';
import { fileURLToPath } from 'url';
import { testDatabase } from './src/models/index.js';
import pool from './src/db/init.js';
import setUpDevMode from './src/utils/devMode.js';

// TEST
pool

/**
 * Global Variables
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT;

/**
 * Create and configure the Express server
 */
const app = express();

// Configure the application based on environment settings
app.use(configNodeEnv);

// Configure static paths (public dirs) for the Express application
configureStaticPaths(app);

// Set EJS as the view engine and record the location of the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Set Layouts middleware to automatically wrap views in a layout and configure default layout
app.set('layout default', 'default');
app.set('layouts', path.join(__dirname, 'src/views/layouts'));
app.use(layouts);

// Middleware to process multipart form data with file uploads
app.use(fileUploads);

// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse URL-encoded form data (like from a standard HTML form)
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

app.use('/', homeRoute);

/**
 * Start the server
 */

// When in development mode, start a WebSocket server for live reloading
setUpDevMode()

// Start the Express server
app.listen(port, async () => {
    // await testDatabase();
    console.log(`Server running on http://127.0.0.1:${port}`);
});