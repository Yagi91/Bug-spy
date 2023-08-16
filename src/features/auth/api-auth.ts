import config from "../../config";
const backendUrl = "https://bug-spy-server.ew.r.appspot.com"

const signin = async (user: { email: string, password: string, jwt?: string }) => {
    try {
        let response = await fetch(backendUrl + '/auth/signin/', {
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
        if (data.error) {
            throw new Error(data.error);
        }
        console.log("data:", data);
        return data;
    } catch (err: any) {
        console.error(err);
        throw new Error(err.message);
    }
};

const signout = async () => {
    try {
        let response = await fetch(config.backendUrl + '/auth/signout/', { method: 'GET' });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

export { signin, signout };