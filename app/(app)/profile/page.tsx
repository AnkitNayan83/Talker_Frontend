import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out";

const ProfilePage = async () => {
    const session = await auth();
    return (
        <div>
            <p className="font-semibold text-xl">{JSON.stringify(session)}</p>
            <SignOutButton />
        </div>
    );
};

export default ProfilePage;
