import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }:any) {
      session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  }
});