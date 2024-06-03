import { News } from "./news";
import { SeacrhBar } from "./searchbar";

export const RightBar = () => {
    return (
        <div className="md:sticky md:top-0 md:h-screen flex flex-col w-full md:w-[300px] items-center p-4 gap-6">
            <SeacrhBar />
            <News />
        </div>
    );
};
