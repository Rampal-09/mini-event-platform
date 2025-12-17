import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import EventList from "./pages/EventList";
function App() {
  return (
    <>
      <Signup></Signup>
      <Login></Login>
      <CreateEvent></CreateEvent>
      <EventList></EventList>
    </>
  );
}

export default App;
