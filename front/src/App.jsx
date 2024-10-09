import Users from "./pages/control/users/page";
import ControlLayout from "./pages/control/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./ui/header/header";
import Roles from "./pages/control/roles/rolespage";
import Events from "./pages/control/events/page";
import User from "./pages/control/user/page";
import LoginPage from "./pages/login/page";
import Event from "./pages/control/event/event.page";
import WorkGroups from "./pages/control/workgroups/page";
import WorkGroup from "./pages/control/workgroup/page";
import HomePage from "./pages/home/page";
import PortfolioPage from "./pages/portfolio/page";
import ControlHome from "./pages/control/homepage/homepage";
import RoleEditPage from "./pages/control/role_edit/page";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/control" element={<ControlLayout />}>
          <Route path="" element={<ControlHome />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<Event />} />
          <Route path="groups" element={<Roles />} />
          <Route path="groups/:id" element={<RoleEditPage />} />
          <Route path="workgroups" element={<WorkGroups />} />
          <Route path="workgroups/:id" element={<WorkGroup />} />
        </Route>
        <Route path="portfolio/:id" element={<PortfolioPage />} />
        <Route path="*" element={<>Ops</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
