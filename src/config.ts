const backendUrl = process.env.REACT_APP_API_URL;
const config = {
    backendUrl: backendUrl || 'http://localhost:5000',
};

export default config;