import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Airline from "./components/Airlines/Airline";
import Airport from "./components/Airports/Airport";
import AirlineList from "./components/Airlines/AirlineList";
import SaveAirline from "./components/Airlines/SaveAirline";
import AirportList from "./components/Airports/AirportList";
import SaveAirport from "./components/Airports/SaveAirport";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home";
import ScheduledFlights from "./components/ScheduledFlights/ScheduledFlights";
import ScheFlightList from "./components/ScheduledFlights/ScheFlightList";
import SaveScheFlight from "./components/ScheduledFlights/SaveScheFlight";
import SearchFlights from "./components/SearchFlights/SearchFlights";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/searchFlights/:dept/:dest" element={<SearchFlights />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="airlines" element={<Airline />}>
          <Route index element={<AirlineList />} />
          <Route path="list" element={<AirlineList />} />
          <Route path="save" element={<SaveAirline />} />
        </Route>
        <Route path="airports" element={<Airport />}>
          <Route index element={<AirportList />} />
          <Route path="list" element={<AirportList />} />
          <Route path="save" element={<SaveAirport />} />
        </Route>
        <Route path="scheduledFlights" element={<ScheduledFlights />}>
          <Route index element={<ScheFlightList />} />
          <Route path="list" element={<ScheFlightList />}></Route>
          <Route path="save" element={<SaveScheFlight />}></Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Admin /> */}
    </div>
  );
}

export default App;
