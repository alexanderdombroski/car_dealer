/**
 * Imports
 */
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// Global Middleware
import configNodeEnv from './src/middleware/global/node-env.js';
import fileUploads from './src/middleware/global/file-uploads.js';
import layouts from './src/middleware/global/layouts.js';
import { configureStaticPaths } from './src/utils/index.js';
import { saveSession, useSession } from "./src/middleware/global/sessions.js";
import flashMessages from "./src/middleware/global/flash-messages.js";
import postMethodOverride from "./src/middleware/global/method-override.js";
import { errorCatching, errorThrowing } from "./src/middleware/error/index.js";

// Utils
import setUpDevMode from './src/utils/devMode.js';

// Route Imports
import homeRoutes from './src/routes/index.js';
import accountRoutes from './src/routes/account.js';
import vehicleRoutes from './src/routes/vehicle/index.js';
import repairRoutes from './src/routes/repair.js';

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

// Middleware to use sessions
app.use(useSession);
app.use(saveSession);
app.use(flashMessages);

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

// Method Overriding from POST -> PUT, DELETE, or PATCH
app.use(postMethodOverride);

/**
 * Routes
 */
app.use('/', homeRoutes);
app.use('/account', accountRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/repair', repairRoutes);

// Error Handling
app.use(errorThrowing)
app.use(errorCatching);

// When in development mode, start a WebSocket server for live reloading
setUpDevMode();

// Start the Express server
app.listen(port, async () => {
    // await testDatabase();
    console.log(`Server running on http://127.0.0.1:${port}`);
});