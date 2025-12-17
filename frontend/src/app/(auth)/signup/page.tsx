import SignupForm from '@/components/auth/signup-form';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black selection:bg-purple-500/30">
        
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="z-10 w-full flex flex-col items-center">
        <SignupForm />
        
        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
