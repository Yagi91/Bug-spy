import config from "../../config";

const signin = async (user: { email: string, password: string, jwt?: string }) => {
    try {
        let response = await fetch(config.backendUrl + '/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': user.jwt ? `Bearer ${user.jwt}` : ''
            },
            // credentials: 'include',//this is to allow the client to send cookies
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    } catch (err) {
    }
};

const signout = async () => {
    try {
        let response = await fetch(config.backendUrl + '/auth/signout/', { method: 'GET' });
        return await response.json();
    } catch (err) {
        return err;
    }
}

export { signin, signout };