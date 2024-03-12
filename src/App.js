import { Header } from "./components/header/Header";
import { Menu } from "./components/menu/Menu";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { StatisticPage } from "./pages/StatisticPage";

import { Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/statistic' element={<StatisticPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
