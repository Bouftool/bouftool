import ReactDOM from "react-dom/client";
import { App } from "./front";

// biome-ignore lint/style/noNonNullAssertion: React root element
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
