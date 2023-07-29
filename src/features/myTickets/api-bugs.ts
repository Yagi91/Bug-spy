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

        const data = await response.json();
        if (response.status >= 400) {
            throw new Error(data.error || 'Could not register user');
        }
        return data;

    } catch (err: any) {
        console.error(err);
        throw new Error(err);
    }
};

const listByUser = async (userId: string, credentials: any, signal: any) => {
    console.log("listByUser", { userId, credentials, signal });
    try {
        let response = await fetch(config.backendUrl + '/api/bugs/' + userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (response.status >= 400) {
            throw new Error(data.error || 'Could not register user');
        }
        return data;
    } catch (err: any) {
        console.error(err);
        throw new Error(err);
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



export { create, list, update, listByUser }