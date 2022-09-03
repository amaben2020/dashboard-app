import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { Container, makeStyles } from '@material-ui/core';
import {
  getEvents,
  openModal,
  closeModal,
  selectRange,
  selectEvent,
  updateEvent,
} from 'features/calendar/calendarSlice';
import Page from 'app/components/pages';
import Header from './Header';
import {
  Dialog, //a modal popup
  Paper, //in Material Design, the physical properties of paper are
  useMediaQuery, // a CSS media query hook for React. Detects when its
} from '@material-ui/core';

import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';

import { EventType, ViewType } from 'models/calendar-type';
import AddEditEventForm from './AddEditEventForm';

const Index = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  /* destructuring it because we only need the events, loading, error */

  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const handleAddClick = (): void => {
    dispatch(openModal());
  };
  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const selectedEventSelector = (state: RootState): EventType | null => {
    const { events, selectedEventId } = state.calendar;
    if (selectedEventId) {
      //@ts-ignore
      return events?.find(_event => _event.id === selectedEventId);
    } else {
      return null;
    }
  };

  const selectedEvent = useSelector(selectedEventSelector);

  return (
    <Container maxWidth={false}>
      <Header onAddClick={handleAddClick} />
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleModalClose}
        open={isModalOpen}
      >
        {isModalOpen && (
          <AddEditEventForm
            //@ts-ignore
            event={selectedEvent}
            range={selectedRange}
            onAddComplete={handleModalClose}
            onCancel={handleModalClose}
            onDeleteComplete={handleModalClose}
            onEditComplete={handleModalClose}
          />
        )}
      </Dialog>
    </Container>
  );
};
export default Index;

// always use this pattern, have an index file that displays the components and export it

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },

  calendar: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    '& .fc-unthemed .fc-head': {},
    '& .fc-unthemed .fc-body': {
      backgroundColor: theme.palette.background.default,
    },
    '& .fc-unthemed .fc-row': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-axis': {
      ...theme.typography.body2,
    },
    '& .fc-unthemed .fc-divider': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider,
    },

    '& .fc-unthemed td': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed td.fc-today': {},
    '& .fc-unthemed .fc-highlight': {},
    '& .fc-unthemed .fc-event': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit',
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit',
      },
    },
    '& .fc-unthemed .fc-day-top': {
      ...theme.typography.body2,
    },
    '& .fc-unthemed .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    },
    '& .fc-unthemed .fc-list-view': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-list-empty': {
      ...theme.typography.subtitle1,
    },

    '& .fc-unthemed .fc-list-heading td': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-list-heading-main': {
      ...theme.typography.h6,
    },
    '& .fc-unthemed .fc-list-heading-alt': {
      ...theme.typography.h6,
    },
    '& .fc-unthemed .fc-list-item:hover td': {},
    '& .fc-unthemed .fc-list-item-title': {
      ...theme.typography.body1,
    },
    '& .fc-unthemed .fc-list-item-time': {
      ...theme.typography.body2,
    },
  },
}));
