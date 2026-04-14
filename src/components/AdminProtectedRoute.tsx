import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: Props) {
  const [state, setState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setState('unauthorized');
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      setState(data ? 'authorized' : 'unauthorized');
    };
    check();
  }, []);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (state === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
