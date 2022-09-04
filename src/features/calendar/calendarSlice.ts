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

  // aka case reducers: name holds the value of the string that is used as the prefix for the generated action types.
  // reducer is the complete reducer function (we’ll take a closer look at this in the next exercise).
  // actions holds the the auto-generated action creators.

  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      const { payload } = action;
      state.loading = payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getEvents(state, action: PayloadAction<EventType[]>) {
      state.events = action.payload;
    },
    createEvent(state, action: PayloadAction<EventType>) {
      state.events.push(action.payload);
    },
    selectEvent(state, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.selectedEventId = action.payload;
    },
    updateEvent(state, action: PayloadAction<EventType>) {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      state.events[index] = action.payload;
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(e => e.id !== action.payload);
    },

    /*{start: number; end: number} - this is the shape of the model that we 
can define here right away, although we can also write it separately in 
the models' folder. */
    selectRange(state, action: PayloadAction<{ start: number; end: number }>) {
      /*deconstructing the payload */
      const { start, end } = action.payload;
      state.isModalOpen = true;
      state.selectedRange = {
        start,
        end,
      };
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedEventId = null || '';
      //@ts-ignore
      state.selectedRange = null;
    },
  },
});

/* Export these actions so components can use them. Non-asynchronous 
actions. HTTP client is not needed.  Think of dispatch as setState()*/

export const selectEvent = (id: string): AppThunk => dispatch => {
  dispatch(slice.actions.selectEvent(id));
};

export const selectRange = (start: Date, end: Date): AppThunk => dispatch => {
  dispatch(
    slice.actions.selectRange({
      start: start.getTime(), //getTime() is from moment.js
      end: end.getTime(),
    }),
  );
};
export const openModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.openModal());
};
export const closeModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.closeModal());
};

// you could do this in another file inside redux services
/* Asynchronous actions. Actions that require Axios (HTTP client)
 or any APIs of a library or function that returns a promise. */
export const getEvents = (): AppThunk => async dispatch => {
  dispatch(slice.actions.setLoading(true));
  //  {type: 'slice/setLoading', payload: true}
  dispatch(slice.actions.setError(''));
  //  {type: 'slice/setError', payload: ''}
  try {
    /*getting the data */
    const response = await axios.get<EventType[]>(EndPoints.events);
    /*updating the state in the UI */
    dispatch(slice.actions.getEvents(response.data));
    //  {type: 'slice/getEvents', payload: [{...}]}

    //By default, the action creator accepts one argument, which it puts into the action object as action.payload. The action.type string is generated for us by combining the slice’s name field with the name of the case reducer function.
  } catch (error) {
    console.log(error.message);
    dispatch(slice.actions.setError(error.message));
  } finally {
    dispatch(slice.actions.setLoading(false));
  }
};

export const createEvent = (event: EventType): AppThunk => async dispatch => {
  dispatch(slice.actions.setLoading(true));
  dispatch(slice.actions.setError(''));
  try {
    const { data } = await axios.post<EventType>(EndPoints.events, event);
    // update the state with that data
    dispatch(slice.actions.createEvent(data));
    dispatch(slice.actions.setLoading(false));
  } catch (error) {
    dispatch(slice.actions.setError(error.message));
  }
};

export const updateEvent = (update: EventType): AppThunk => async dispatch => {
  dispatch(slice.actions.setLoading(true));
  dispatch(slice.actions.setError(''));
  try {
    const { data } = await axios.put(
      `${EndPoints.events}/${update.id}`,
      update,
    );
    /*updating the state in the UI */
    dispatch(slice.actions.updateEvent(data));
    dispatch(slice.actions.setLoading(false));
  } catch (error) {
    dispatch(slice.actions.setError(error.message));
  }
};

export const deleteEvent = (id: string): AppThunk => async dispatch => {
  /*deleting from the database */
  try {
    await axios.delete(`${EndPoints.events}/${id}`);
    dispatch(slice.actions.setLoading(false));
    dispatch(slice.actions.deleteEvent(id));
  } catch (error) {
    dispatch(slice.actions.setError(error.message));
  }

  /*deleting it from the UI */
};

// to be used by the store as a slice of state
export default slice.reducer;

//Remember: you are just using one object for the whole application

// you could use .push in createSlice because it uses immer under the hood
// ✅ state.push(item)
// ✅ [...state, item]

//Free resources
//https://www.codecademy.com/courses/learn-redux/lessons/the-redux-toolkit/exercises/return-object-actions
// https://www.educative.io/courses/building-teslas-battery-range-calculator-with-react-and-redux/7nVVPYOGVPr
// https://bluelight.co/blog/redux-toolkit-with-typescript
//https://axios-http.com/docs/post_example

// Redux Thunks: Redux Thunk is middleware that allows you to return functions, rather than just actions, within Redux. This allows for delayed actions, including working with promises.
//it is a redux middleware

// 200: succeeded
//  201. Created:  The request has been fulfilled and has resulted in one or more new resources being created.
