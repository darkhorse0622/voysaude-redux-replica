
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Ficou com alguma dúvida?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span>📞</span>
                <span>11 99186 6413</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>✉️</span>
                <span>ajuda@voysaude.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>❓</span>
                <div>
                  <p className="font-medium">Visite nossa central de ajuda</p>
                  <p className="text-sm opacity-75">Encontre respostas para suas perguntas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Legal Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">LEGAL</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                Política de privacidade
              </a>
              <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                Termos e condições
              </a>
              <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                Seja um afiliado Voy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
                voy
              </div>
            </div>
            <div className="text-sm opacity-75 text-center md:text-right">
              <p>A Voy não é uma farmácia. Todos produtos adquiridos são</p>
              <p>manipulados pelas farmácias credenciadas de acordo com as normas da Anvisa.</p>
              <p className="mt-2">Copyright 2025 Voy™. Todos os direitos reservados.</p>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mt-6">
            <div className="w-8 h-8 bg-blue-600 rounded"></div>
            <div className="w-8 h-8 bg-blue-400 rounded"></div>
            <div className="w-8 h-8 bg-blue-800 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
