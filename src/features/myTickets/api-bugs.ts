import config from "../../config";

const backEnd = 'http://localhost:5000';

const create = async (bug: { name: string, description: string, priority: string, assignee: string, project: string }) => {
    console.log(bug);
    try {
        let response = await fetch(backEnd + '/api/bugs/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bug)
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

const update = async (bugId: string, credentials: any, bug: any) => {
    try {
        let response = await fetch(config.backendUrl + '/api/bugs/' + bugId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
            },
            body: JSON.stringify(bug)
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