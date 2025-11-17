import Layout from "./components/Layout";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <Layout>
                <AppRouter />
            </Layout>
        </AuthProvider>
    );
}