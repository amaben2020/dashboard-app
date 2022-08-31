/*PayloadAction is for typings */
import {
  createSlice,
  ThunkAction,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store/reducers';
import { EventType } from 'models/calendar-type';
import axios, { EndPoints } from 'api/axios';

/*typings for the Thunk actions to give us intlelli-sense */
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
/*Shape or types of our CalendarState */
interface CalendarState {
  events: EventType[];
  isModalOpen: boolean;
  selectedEventId?: string; //nullable
  selectedRange?: {
    start: number;
    end: number;
  };
  loading: boolean; //useful for showing spinner or loading screen
  error: string;
}

const initialState: CalendarState = {
  events: [],
  isModalOpen: false,
  selectedEventId: '',
  selectedRange: {
    start: 0,
    end: 0,
  },
  loading: false,
  error: '',
};

const calendarNamespace = 'calendar';
/*Single-File implementation of Redux-Toolkit*/
const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: calendarNamespace,

  /*initialState is the default value of this namespace/module and it is 
required.*/
  initialState, // same as initialState: initialState
  /*reducers -- for non asynchronous actions. It does not require Axios.*/
  /* the state here refers to the CalendarState */
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getEvents(state, action: PayloadAction<EventType[]>) {
      state.events = action.payload;
    },
  },
});
/* Asynchronous actions. Actions that require Axios (HTTP client)
 or any APIs of a library or function that returns a promise. */
export const getEvents = (): AppThunk => async dispatch => {
  dispatch(slice.actions.setLoading(true));
  dispatch(slice.actions.setError(''));
  try {
    const response = await axios.get<EventType[]>(EndPoints.events);
    dispatch(slice.actions.getEvents(response.data));
  } catch (error) {
    console.log(error.message);
    dispatch(slice.actions.setError(error.message));
  } finally {
    dispatch(slice.actions.setLoading(false));
  }
};
export default slice.reducer;
