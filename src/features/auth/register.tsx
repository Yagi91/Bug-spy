import React from 'react';

interface Props {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    registerStatus: string;
    error?: string;
}

export default function Register({ handleSubmit, registerStatus, error }: Props) {

    const isLoggedIn = registerStatus === "Success";
    const isLoading = registerStatus === "Loading";

    if (isLoggedIn) return <h1>Sign Up Success</h1>
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Sign Up</legend>
                <input type="email" name="email" placeholder="Email" required />
                <div><em>Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number. No special characters allowed.</em></div>
                <input type="password" name="password" placeholder="Password" required minLength={8} maxLength={20} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" />
                <input
                    type="password"
                    name="password-check"
                    placeholder="Re-enter Password"
                    required
                    minLength={8}
                    maxLength={20}
                />
                <div>{error}</div>
                <button type="submit">Sign Up</button>
                <div>{isLoading && "Loading..."}</div>
            </fieldset>
        </form>
    )
}