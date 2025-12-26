import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { getAllEvents } from "../../redux/actions/event";

const Events = () => {
  const dispatch = useDispatch();

  // Get events from Redux
  const { events, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents()); // fetch all events
  }, [dispatch]);

  // Take the first event
  const firstEvent = events && events.length > 0 ? events[0] : null;

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid shadow-lg">
        {isLoading ? (
          <p className="text-center py-5">Loading events...</p>
        ) : firstEvent ? (
          <EventCard data={firstEvent} />
        ) : (
          <p className="text-center py-5 text-gray-500">No events found</p>
        )}
      </div>
    </div>
  );
};

export default Events;
