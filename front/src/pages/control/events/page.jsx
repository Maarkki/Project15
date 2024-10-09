import { useContext, useEffect, useState } from "react";
import EventsService from "../../../services/events/events";
import PageHead from "../../../ui/control/pagehead/pagehead";
import CheckModal from "../../../ui/modals/checkmodal";
import CreateEventModal from "../../../ui/modals/createevent";
import { useNavigate } from "react-router-dom";

import EventsTable from "../../../ui/tables/eventstable";
import { AuthContext } from "../../../lib/providers/authprovider";
import ForbiddenComponent from "../../../ui/control/errors/forbidden";

const Events = () => {
  let navigate = useNavigate();
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["events_view", "events_edit", "events_remove"],
    permissions
  );
  const [events, setEvents] = useState(null);
  const [delIsOpen, setDelOpen] = useState(false);
  const [selEvent, setSelEvent] = useState(null);
  const [createIsOpen, createSetOpen] = useState(false);
  function modalOpen(event) {
    setSelEvent(event);
    setDelOpen(true);
  }
  async function delEvent() {
    const data = await EventsService.removeById(selEvent.id);
    if (data.remove) setEvents(events.filter((u) => u.id !== selEvent.id));
    setDelOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await EventsService.getAll();
      setEvents(data);
    };

    fetchData();
  }, []);
  if (!rights.events_view) return <ForbiddenComponent />;
  return (
    <div className="controlpage__background">
      <CreateEventModal
        isOpen={createIsOpen}
        closeHandle={() => createSetOpen(false)}
        addEvent={setEvents}
        events={events}
      />
      <CheckModal
        isOpen={delIsOpen}
        closeHandle={setDelOpen}
        submitHandle={delEvent}
      />
      <PageHead
        createHandle={
          rights.events_edit ? () => createSetOpen(true) : undefined
        }
      >
        <h1>Список мероприятий</h1>
      </PageHead>
      <div className="page__body">
        <EventsTable
          events={events}
          delFunc={rights.events_remove ? modalOpen : undefined}
          editFunc={(control) =>
            navigate(`/control/events/${control.id}`, {
              state: { prev: "/control/events" },
            })
          }
        />
      </div>
    </div>
  );
};

export default Events;
