interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-sky-300">{children}</div>
    );
};

export default AuthLayout;
