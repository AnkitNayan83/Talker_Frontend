export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName?: string | null;
    userName: string;
    profileImage?: string | null;
    coverImage?: string | null;
    bio?: string | null;
    emailVerified?: Date | null;
    hashedPassword?: string | null;
    hasNotification: boolean;
    isMember: boolean;
    createdAt: Date;
    updatedAt: Date;
    followedBy: UserFollows[];
    following: UserFollows[];
    likedPost: PostLike[];
    likedComment: CommentLike[];
    notifications: Notification[];
    refNotifications: Notification[];
    posts: Post[];
    comments: Comment[];
}

export interface UserFollows {
    followedById: string;
    followedBy: User;
    followingId: string;
    following: User;
}

export interface Post {
    id: string;
    body: string;
    image?: string | null;
    likes: PostLike[];
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    refNotifications: Notification[];
}

export interface PostLike {
    postId: string;
    post: Post;
    userId: string;
    user: User;
}

export interface Comment {
    id: string;
    body: string;
    userId: string;
    user: User;
    postId?: string | null;
    post?: Post | null;
    likes: CommentLike[];
    parentCommentId?: string | null;
    parentComment?: Comment | null;
    commentReplies: Comment[];
    createdAt: Date;
    updatedAt: Date;
    notifications: Notification[];
}

export interface CommentLike {
    commentId: string;
    comment: Comment;
    userId: string;
    user: User;
}

export enum NotificationType {
    USER = "USER",
    POST = "POST",
    COMMENT = "COMMENT",
    SYSTEM = "SYSTEM",
}

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    userId: string;
    user: User;
    refUserId?: string | null;
    refUser?: User | null;
    refPostId?: string | null;
    refPost?: Post | null;
    refCommentId?: string | null;
    refComment?: Comment | null;
    createdAt: Date;
    updatedAt: Date;
}
