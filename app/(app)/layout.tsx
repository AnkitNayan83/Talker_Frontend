import { Navbar } from "@/components/navbar";
import { RightBar } from "@/components/rightbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen flex justify-between items-start md:mt-0">
            <Navbar />
            <div className="flex flex-col-reverse md:flex md:flex-row justify-center w-full md:w-[80%] ">
                <div className="w-full md:w-[60%]">{children}</div>
                <RightBar />
            </div>
        </div>
    );
};

export default AppLayout;
