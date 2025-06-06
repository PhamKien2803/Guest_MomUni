import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage2 from "./page/Guest/HomePage";
import BlogPageDetails from "./page/Guest/BlogDetails";
import Blog2 from "./page/Guest/Blog2";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<HomePage2 />} />
    //     {/* <Route path="/blog" element={<BlogPageMUI />} /> */}
    //     <Route path="/blog" element={<Blog2 />} />
    //     <Route path="/blog/:slug" element={<BlogPageDetails />} />
    //   </Routes>
    // </BrowserRouter>


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog2 />} />
        <Route path="/about-us" element={<HomePage2 />} />
        <Route path="/blog/:slug" element={<BlogPageDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
