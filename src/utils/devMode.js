import * as ws from "ws";


const mode = process.env.MODE;
const port = process.env.PORT;


export default function setUpDevMode() {
    if (mode.includes('dev')) {    
        try {
            const wsPort = parseInt(port) + 1;

            const wsServer = new ws.WebSocketServer({ port: wsPort });

            wsServer.on('listening', () => {
                console.log(`WebSocket server is running on port ${wsPort}`);
            });
    
            wsServer.on('error', (error) => {
                console.error('WebSocket server error:', error);
            });
        } catch (error) {
            console.error('Failed to start WebSocket server:', error);
        }
    }
}