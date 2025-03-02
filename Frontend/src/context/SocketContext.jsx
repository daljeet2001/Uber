import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const userSocket = io(`${import.meta.env.VITE_USER_URL}`);
const rideSocket = io(`${import.meta.env.VITE_RIDE_URL}`);
const mapSocket = io(`${import.meta.env.VITE_MAP_URL}`);
const captainSocket = io(`${import.meta.env.VITE_CAPTAIN_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic for user socket
        userSocket.on('connect', () => {
            console.log('Connected to user server');
        });

        userSocket.on('disconnect', () => {
            console.log('Disconnected from user server');
        });

        // Basic connection logic for ride socket
        rideSocket.on('connect', () => {
            console.log('Connected to ride server');
        });

        rideSocket.on('disconnect', () => {
            console.log('Disconnected from ride server');
        });

      
        // Basic connection logic for map socket
        mapSocket.on('connect', () => {
            console.log('Connected to map server');
        });

        mapSocket.on('disconnect', () => {
            console.log('Disconnected from map server');
        });

        // Basic connection logic for captain socket
        captainSocket.on('connect', () => {
            console.log('Connected to captain server');
        });

        captainSocket.on('disconnect', () => {
            console.log('Disconnected from captain server');
        });

    }, []);

    return (
        <SocketContext.Provider value={{ userSocket, rideSocket, mapSocket, captainSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;