import Calendar from "./components/Calendar";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

const CalendarPage = () => {
  return (
    <div className="App">
      <div className="calendar-page-grid">
        <Navbar props="calendar"/>
        <Header />
        <Calendar />
      </div>
    </div>
  );
};
export default CalendarPage;
