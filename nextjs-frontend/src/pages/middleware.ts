// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server";

// export default withAuth(
//    function middleware(req: any) {
//        const { token } = req.nextauth
//        const allow = token && Math.floor(Date.now()) < (token as any).expires_at * 1000
//        console.log('MIDDLEWARE', req, token, allow);
//        
//        return allow 
//            ? NextResponse.next()
//            : NextResponse.redirect("/login");
//    }
// )
