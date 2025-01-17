import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";
import { axios } from "@/app/lib/axios";

window.Pusher = Pusher;

const useEcho = () => {
    const [echoInstance, setEchoInstance] = useState(null);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: "reverb", // Ensure the correct broadcaster is used
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        axios.post('/api/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                            .then(response => {
                                callback(false, response.data);
                            })
                            .catch(error => {
                                callback(true, error);
                            });
                    }
                };
            },
            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
            wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
            forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
            enabledTransports: ["ws", "wss"],
        });

        setEchoInstance(echo);
    }, []); // Empty dependency array ensures this runs once on mount

    return echoInstance;
};

export default useEcho;

