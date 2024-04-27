import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Login from "./screens/login";

library.add(fas);

function App() {

  return (
    <>
      <Login />
    </>
  );
}

export default App;
