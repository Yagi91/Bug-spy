import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { _ProjectBug } from "../common/types";
import { selectMyTickets, selectMyTicketsError, selectMyTicketsLoading, fetchMyTickets } from "./myTicketSlice";


const MyTickets = () => {

    const myTickets = useAppSelector(selectMyTickets);
    const myTicketsError = useAppSelector(selectMyTicketsError);
    const myTicketsLoading = useAppSelector(selectMyTicketsLoading);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMyTickets("Mary"));
    }, [dispatch]);

    return (
        <div>
            <h1>My Tickets</h1>
            <p>Issues/Bugs assigned to you</p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myTicketsLoading ? <tr><td>Loading...</td></tr> : (
                                myTicketsError ? <tr><td>{myTicketsError}</td></tr> : myTickets.map((ticket: _ProjectBug) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.priority}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.created}</td>
                                        <td>{ticket.updated}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default MyTickets;