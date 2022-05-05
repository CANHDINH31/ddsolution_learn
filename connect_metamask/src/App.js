import logo from "./logo.svg";
import "./App.css";
import WalletCard from "./WalletCard.js";
import WalletCardEthers from "./WalletCardEthers";

function App() {
  return (
    <div className="App">
      {/* <WalletCard /> */}
      <WalletCardEthers />
    </div>
  );
}

export default App;
