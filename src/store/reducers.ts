/* Combine all reducers in this file and export the combined reducers.
combineReducers - turns an object whose values are different reducer 
functions into a single reducer function. */
import { combineReducers } from '@reduxjs/toolkit';
import calendarReducer from 'features/calendar/calendarSlice';
/* injectedReducers - an easier way of registering a reducer */
const injectedReducers = {
  //reducers here to be added one by one.
  calendar: calendarReducer,
};
/* combineReducers requires an object.we're using the spread operator (...
injectedReducers) to spread out all the Reducers */
const rootReducer = combineReducers({
  ...injectedReducers,
});
/* RooState is the type or shape of the combinedReducer easier way of 
getting all the types from this rootReduder instead of mapping it one 
by one. RootState - we can use the Selector to give us intelli-sense in 
building our components. */
export type RootState = ReturnType<typeof rootReducer>;
export const createReducer = () => rootReducer;
