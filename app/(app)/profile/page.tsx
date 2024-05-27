import { auth, signOut } from "@/auth";
import { SignOutButton } from "@/components/sign-out";
import { Button } from "@/components/ui/button";

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
