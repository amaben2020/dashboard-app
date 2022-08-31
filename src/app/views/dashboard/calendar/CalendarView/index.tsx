import React, { useEffect } from 'react';
import { getEvents } from 'features/calendar/calendarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  return (
    <div>
      <h1>Calendar Works!</h1>
    </div>
  );
};
export default Index;

// always use this pattern, have an index file that displays the components and export it
