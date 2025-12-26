import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import EventCard from "../components/Events/EventCard";
import { getAllEvents } from "../redux/actions/event";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const dispatch = useDispatch();

  const { events, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      <Header activeHeading={4} />

      {isLoading ? (
        <Loader/>
      ) : Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event._id} data={event} />
        ))
      ) : (
        <p className="text-center py-10">No events found</p>
      )}

      <Footer />
    </div>
  );
};

export default EventsPage;
