import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";

const App: React.FC<{}> = () => {
  return (
    <div className="bg-red-500 w-[500px]">
      <ul>
        <li>Pick Color From Web Page</li>
      </ul>
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
