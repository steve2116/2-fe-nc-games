import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { userContext } from "../contexts/user";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import ReviewList from "./ReviewList.jsx";
import "../designs/App.css";
import Categories from "./Categories";

export default function App() {
    const { user, setUser } = useContext(userContext);
    const [hoverClass, setHoverClass] = useState("content-container");

    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <div className={hoverClass}>
                <div
                    onClick={() => {
                        setHoverClass("hover-cats");
                    }}
                    onMouseLeave={() => {
                        setHoverClass("content-container");
                    }}
                    id="category-menu"
                >
                    <Categories />
                </div>
                <main>
                    <p>Currently logged in as: {user.username}</p>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/reviews"
                            element={<ReviewList />}
                        />
                    </Routes>
                </main>
            </div>
            <footer>FOOTER</footer>
        </>
    );
}
