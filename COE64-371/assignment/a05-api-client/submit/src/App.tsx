import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/Layout";
import ListPage from "@/pages/ListPage";
import AddPage from "@/pages/AddPage";
import DetailPage from "@/pages/DetailPage";
import ManagePage from "@/pages/ManagePage";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="add" element={<AddPage />} />
            <Route path="detail/:id" element={<DetailPage />} />
            <Route path="manage" element={<ManagePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
