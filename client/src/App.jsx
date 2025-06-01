import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage2 from "./page/Guest/HomePage";
import BlogPageMUI from "./page/Guest/Blog";
import BlogPageDetails from "./page/Guest/BlogDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/blog" element={<BlogPageMUI />} />
        <Route path="/blog/:slug" element={<BlogPageDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
