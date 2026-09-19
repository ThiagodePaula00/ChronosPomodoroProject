import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AboutPomodoro } from "../components/aboutPomodoro";
import { Home } from "../pages/Home";
import { NotFound } from "../components/NotFound";
import { useEffect } from "react";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }, [pathname]);

    return null;
}

export function MainRouter() {
    return (
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-pomodoro/' element={<AboutPomodoro />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    )
}
