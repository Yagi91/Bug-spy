import React from "react";
import MyTickets from "../features/myTickets/myTicket";
import { useTitle } from "../features/common/customHooks";

export default function MyTicketsPage() {
  useTitle("Bug Spy - My Tickets: See all the bugs assigned to you");
  return (
    <>
      <MyTickets />
    </>
  );
}
