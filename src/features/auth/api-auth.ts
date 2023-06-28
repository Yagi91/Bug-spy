
const signin = async (user: { email: string, password: string }) => {
    try {
        let response = await fetch('/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',//this is to allow the client to send cookies
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

export { signin, signout };