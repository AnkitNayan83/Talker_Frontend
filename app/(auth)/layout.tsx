interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-[#333] bg-gray-200">
            {children}
        </div>
    );
};

export default AuthLayout;
