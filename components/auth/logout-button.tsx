"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

/**
 * Renders a logout button component.
 *
 * @param {LogoutButtonProps} props - The props for the logout button component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the logout button.
 * @return {JSX.Element} The logout button component.
 */

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    return (
        <span className="cursor-pointer" onClick={() => signOut()}>
            {children}
        </span>
    );
};
