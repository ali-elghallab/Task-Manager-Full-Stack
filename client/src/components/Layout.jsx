import Header from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#0f1117] flex flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}