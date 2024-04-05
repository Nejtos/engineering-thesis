import Navbar from "../../components/Navbar";
import SettingsPanel from "./components/SettingsPanel";
import Header from "../../components/Header";

const SettingsPage = () => {
  return (
    <div className="App">
      <div className="settings-page-grid">
        <Navbar props="settings" />
        <Header />
        <SettingsPanel />
      </div>
    </div>
  );
};
export default SettingsPage;
