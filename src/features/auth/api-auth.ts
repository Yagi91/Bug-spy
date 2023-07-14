const backendUrl = "http://localhost:5000";

const signin = async (user: { email: string, password: string }) => {
    try {
        console.log(process.env.BackEndUrl);
        let response = await fetch(backendUrl + '/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // credentials: 'include',//this is to allow the client to send cookies
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log("data:", data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

const signout = async () => {
    try {
        let response = await fetch(backendUrl + '/auth/signout/', { method: 'GET' });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

export { signin, signout };