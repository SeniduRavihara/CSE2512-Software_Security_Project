import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black selection:bg-teal-500/30">
      
      {/* Background Gradients */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] left-[-10%] w-[30%] h-[50%] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="z-10 w-full flex flex-col items-center">
        <Suspense>
          <LoginForm />
        </Suspense>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
