import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { LocalRoutes } from "./app/routes";

const App = () => {
  const history = createBrowserHistory({ window });

  return (
    <Router history={history}>
      <LocalRoutes />
    </Router>
  );
};

export default App;
