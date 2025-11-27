interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  posts: IPost[];
  createdAt: Date;
}

interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
}
