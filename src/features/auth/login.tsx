import React from 'react';

interface Props {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    loginStatus: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function LogIn({ handleSubmit, loginStatus, error, handleChange }: Props) {

    const isLoggedIn = loginStatus === "Success";
    const isLoading = loginStatus === "Loading";

    if (isLoggedIn) return <h1>Login Success</h1>
    return (
        <form onSubmit={handleSubmit} >
            <fieldset>
                <legend>Login</legend>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <div>{error}</div>
                <button type="submit" disabled={isLoading}>Login</button>
            </fieldset>
            <div>{isLoading && "Loading..."}</div>
        </form>
    )
}