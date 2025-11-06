// src/App.jsx
import Layout from "./components/Layout";
import AppRouter from "./router/AppRouter";

export default function App() {
    return (
        <Layout>
            <AppRouter />
        </Layout>
    );
}