import { News } from "./news";
import { SeacrhBar } from "./searchbar";

export const RightBar = () => {
    return (
        <div className="sticky top-0 h-screen flex flex-col w-[300px] items-center p-4 gap-6">
            <SeacrhBar />
            <News />
        </div>
    );
};
