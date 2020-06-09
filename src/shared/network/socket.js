import io from 'socket.io-client';
import { url } from '../../config/constansts';
console.log(process.env.PUBLIC_URL);
const socket = io(url[process.env.NODE_ENV] || url.dev, {
    reconnection: true
});

export {
    socket
}