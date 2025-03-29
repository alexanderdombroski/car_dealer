import { getNav } from "../../utils/templates.js";

const port = process.env.DEV_PORT || 3001;
const mode = process.env.MODE || 'production';

const configureNodeEnvironment = async (req, res, next) => {
    res.locals.isDevMode = mode.includes('dev');
    res.locals.navHTML = getNav();
    res.locals.port = port;
    res.locals.scripts = [];
    res.locals.styles = [];

    // Add things only needed in development mode
    if (res.locals.isDevMode) {
        // Add livereload script to the page
        res.locals.scripts.push(`
            <script>
                const ws = new WebSocket('ws://127.0.0.1:${port}');
                ws.onclose = () => {
                    setTimeout(() => location.reload(), 2000);
                };
            </script>    
        `);
    }

    next();
};

export default configureNodeEnvironment;