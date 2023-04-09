import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import projectDetailsReducer from "../features/projects/projectDetailSlice";
import myTicketReducer from "../features/myTickets/myTicketSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    project: projectReducer,
    projectDetails: projectDetailsReducer,
    myTickets: myTicketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
