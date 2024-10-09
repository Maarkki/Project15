import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHead from "../../../ui/control/pagehead/pagehead";
import EventUsers from "../../../ui/control/eventusers/eventusers";
import EventsService from "../../../services/events/events";
import EditEventForm from "../../../ui/forms/editevent";
import { AuthContext } from "../../../lib/providers/authprovider";
import ForbiddenComponent from "../../../ui/control/errors/forbidden";

const Event = () => {
  let { id } = useParams();
  const [event, setEvent] = useState(null);
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["events_view", "events_edit", "events_remove", "users_edit"],
    permissions
  );
  useEffect(() => {
    const getEvent = async () => {
      setEvent(await EventsService.getById(id));
    };

    getEvent();
  }, [id]);
  if (!rights.events_view) return <ForbiddenComponent />;
  return (
    <div className="page__compose">
      <PageHead backLink={"/control/events"}>
        <h1>Изменение мероприятия</h1>
      </PageHead>
      <div className="controlpage__background">
        <PageHead>
          <h2>Основная информация</h2>
        </PageHead>
        <div className="page__body">
          {event !== null ? (
            <EditEventForm
              eventData={event}
              setEvent={setEvent}
              enable={rights.events_edit}
            />
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>

      <EventUsers
        id={event !== null ? id : undefined}
        createEnable={rights.users_edit && rights.events_edit}
        deleteEnable={rights.users_edit && rights.events_edit}
      />
    </div>
  );
};

export default Event;
