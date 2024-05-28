import { Navbar } from "@/components/navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen">
            <Navbar />
            {children}
        </div>
    );
};

export default AppLayout;
