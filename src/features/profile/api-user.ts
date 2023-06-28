import exp from "constants";

const create = async (user: any) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        );
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

const list = async (signal: any) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'GET',
            signal: signal,//signal is used to abort the fetch request when the component unmounts
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

const read = async (params: any, credentials: any, signal: any) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
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
}

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
}

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
}

export { create, list, read, update, remove }