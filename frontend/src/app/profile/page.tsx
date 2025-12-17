import jwt from 'jsonwebtoken';
import { LogOut, Mail, Shield, User } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// Define the shape of the decoded token (based on your login route)
interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  let user: DecodedToken | null = null;
  try {
    const secret = process.env.JWT_SECRET || 'supersecretkeychangeinproduction';
    user = jwt.verify(token.value, secret) as DecodedToken;
  } catch (error) {
    // Token invalid or expired
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-teal-500/30 font-sans">
      
      {/* Background - Consistent with other pages */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">
        
        {/* Profile Card */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-teal-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-900/40 to-emerald-900/40" />
          
          <div className="relative pt-12 flex flex-col items-center">
            {/* Avatar Placeholder */}
            <div className="w-32 h-32 rounded-full bg-black border-4 border-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-6 group transition-transform hover:scale-105">
              <User className="w-16 h-16 text-teal-400 group-hover:text-teal-300 transition-colors" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-teal-400 mb-8 font-medium">Standard User</p>

            {/* Info Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors flex items-center space-x-4">
                <div className="p-3 bg-teal-500/10 rounded-xl">
                  <Mail className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-white font-medium truncate">{user.email}</p>
                </div>
              </div>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors flex items-center space-x-4">
                <div className="p-3 bg-teal-500/10 rounded-xl">
                  <Shield className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">User ID</p>
                  <p className="text-white font-medium truncate" title={user.userId}>{user.userId}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full border-t border-white/10 pt-8 flex justify-center">
              <Link
                href="/api/auth/logout" // You might need to implement this or just handle client-side cookie deletion
                className="group flex items-center px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full transition-all border border-red-500/20 hover:border-red-500/50"
              >
                <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Sign Out
              </Link>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
