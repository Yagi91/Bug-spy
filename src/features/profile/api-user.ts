import config from "../../config";

const backEnd = 'http://localhost:5000';

const create = async (user: { name: string, password: string, email: string, role?: string }) => {
    console.log(user);
    try {
        let response = await fetch(backEnd + '/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        );
        if (response.status === 404) {
            throw new Error("Check Internet Connection");
        }

        const data = await response.json();
        console.log("data", data);
        if (response.status >= 400) {
            throw new Error(data.error || 'Could not register user');
        }

        return await data;
    } catch (err: any) {
        console.error("Error details:", err.message);
        throw new Error(err);
    }
};

const list = async (signal: any) => {
    try {
        let response = await fetch(config.backendUrl + '/api/users/', {
            method: 'GET',
            signal: signal,//signal is used to abort the fetch request when the component unmounts
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

const read = async (params: any, credentials: any, signal: any) => {
    try {
        let response = await fetch(config.backendUrl + '/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

const update = async (params: any, credentials: any, user: any) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

const remove = async (params: any, credentials: any) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

export { create, list, read, update, remove }