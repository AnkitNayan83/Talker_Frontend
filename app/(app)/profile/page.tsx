import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out";
import { CurrentUser } from "@/lib/auth";

const ProfilePage = async () => {
    const user = await CurrentUser();
    return (
        <div>
            <p className="font-semibold text-xl w-[500px]">{JSON.stringify(user)}</p>
            <SignOutButton />
        </div>
    );
};

export default ProfilePage;
