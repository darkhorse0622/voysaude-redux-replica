import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/navigationSlice';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.navigation);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      <div className="border-b border-b-gray-400/50">
        <div className={`flex justify-center items-center h-16 bg-white`}>
          {/* Logo */}
          <div className="relative flex items-center">
            <a className={`cursor-pointer font-bold text-3xl px-8 rounded-lg text-primary`} onClick={() => navigate("/")}>
              voy
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
