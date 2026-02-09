import { HomeRenderer } from "./core/renders/HomeRenderer";
import { LayoutRenderer } from "./core/renders/layouts/LayoutRenderer";

function App() {
  return (
    <LayoutRenderer>
      <HomeRenderer />
    </LayoutRenderer>
  );
}

export default App;
