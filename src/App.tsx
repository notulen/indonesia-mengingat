import Figure from "@/pages/Figure";
import Home from "@/pages/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter basename="/indonesia-mengingat">
      <div className="max-w-4xl mx-auto p-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">Indonesia Mengingat</h1>
        </Link>

        <main className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/figures/:id" element={<Figure />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
