import { Navbar } from "@/components/navbar";
import { RightBar } from "@/components/rightbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen flex justify-between mt-4 md:mt-0">
            <Navbar />
            <div className="flex-1 flex flex-col-reverse md:flex md:flex-row justify-center">
                {children}
                <RightBar />
            </div>
        </div>
    );
};

export default AppLayout;
