import { Link } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLogout } from '@/hooks/auth/useAuth';

const Header = () => {
  const { isLoggedIn, user } = useAuthStore();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header>
      <nav className="bg-blue-500 text-white shadow-md" aria-label="주요 내비게이션">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/" className="hover:text-gray-300">
              로고
            </Link>
          </h1>

          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">
                홈
              </Link>
            </li>

            {isLoggedIn && user ? (
              <>
                <li className="text-sm flex items-center" aria-live="polite">
                  안녕하세요, <strong className="ml-1">{user.username}</strong>님
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:bg-red-400 text-sm"
                    aria-busy={logout.isPending}
                  >
                    {logout.isPending ? '로그아웃 중...' : '로그아웃'}
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-yellow-600 rounded hover:bg-blue-700 text-sm"
                >
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
