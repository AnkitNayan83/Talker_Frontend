interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div>
            <h1>App Layout</h1>
            {children}
        </div>
    );
};

export default AppLayout;
