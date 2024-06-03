import { Navbar } from "@/components/navbar";
import { RightBar } from "@/components/rightbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen flex justify-between">
            <Navbar />
            <div className="flex-1 flex justify-center">
                {children}
                <RightBar />
            </div>
        </div>
    );
};

export default AppLayout;
