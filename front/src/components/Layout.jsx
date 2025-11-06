import Header from "./header/Header.jsx";
import "./layout.css";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Header />
            <main className="content">{children}</main>
        </div>
    );
}
