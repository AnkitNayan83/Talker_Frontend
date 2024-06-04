interface CommentPageProps {
    params: {
        id: string;
    };
}

const CommentPage = async ({ params }: CommentPageProps) => {
    const id = params.id;
    // const comment = await getCommentsById(id);
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
};

export default CommentPage;
