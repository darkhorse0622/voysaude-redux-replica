
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/navigationSlice';
import {Button} from '@/components/ui/button';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.navigation);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: 'Como funciona', href: '/' },
    { name: 'Tratamentos', href: '/treatments' },
    { name: 'Especialistas', href: '/especialistas' },
    { name: 'Resultados', href: '/resultados' },
    { name: 'Recursos', href: '/recursos' },
  ];

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
        <div className={ ` flex justify-center md:justify-start items-center h-16 ${isScrolled?'bg-white':'text-orange-10'}` }>
          {/* Logo */}
          <div className="relative flex items-center">
            <a className={ `cursor-pointer  font-bold text-3xl px-8 rounded-lg  text-primary`} onClick={()=>navigate("/")}>
              voy
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 mr-auto">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`cursor-pointer transition-colors duration-200 font-medium text-primary hover:text-orange-500`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center space-x-4 pr-8">
            <a className={`cursor-pointer transition-colors duration-200 text-primary hover:text-orange-500`}>
              Entrar
            </a>
          </div>

          {/* Mobile menu button */}
          <div className={`absolute left-0 md:hidden text-primary`}>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="p-2 transition-colors duration-200 "
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Fader */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-0 z-40 md:hidden transition-transform duration-500 ease-in-out">
            {/* Fader background */}
            
            {/* Menu content */}
            <div className='relative h-full bg-white'>
              <button
                onClick={() => dispatch(closeMobileMenu())}
                className="p-2 pt-4 transition-colors duration-200 "
              >
                <X size={ 24 } />
              </button>
              <div className="px-2 space-y-1">
                <div className="font-bold text-md mb-4 px-3 py-4 border-b border-b-gray-200">Menu</div>
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={` border-b border-b-gray-200 block px-3 py-4 font-medium transition-colors duration-200 text-primary hover:text-orange-500`}
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    {item.name}
                    <span className="float-right">›</span>
                  </a>
                ))}
                <div className={`mt-4 pt-4`}>
                  <div className={`border-b border-b-gray-200 font-bold text-md mb-4 py-4 px-3 text-primary`}>Minha Conta</div>
                  <a
                    href="#entrar"
                    className={`border-b border-b-gray-200 block px-3 py-4 font-medium transition-colors duration-200 text-primary hover:text-orange-500`}
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    Entrar
                    <span className="float-right">›</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button className="fixed bottom-36 right-4 rounded-full p-0">
        <img src='/img/whatsapp_voy_br.svg' alt="WhatsApp"  />
      </Button>
    </header>
  );
};

export default Header;
