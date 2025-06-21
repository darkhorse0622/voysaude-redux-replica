import { Button } from "./ui/button";
const Footer = () => {
  return (
    <footer className="relative bg-primary text-white">
      <div className="fixed bg-white flex justify-between max-md:justify-center items-center bottom-0 w-full px-8 md:px-12 py-4 sm:px-2">
        <div className="text-primary max-md:hidden">A sua receita para perder peso</div>
        <Button className="bg-orange-500 px-12 py-6 text-md font-bold text-primary max-md:w-full hover:bg-orange-300">Quero uma avaliação</Button>
      </div>
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold">Ficou com alguma dúvida?</h3>
            <div className="space-y-3 hidden lg:block">
              <button className="flex items-center space-x-3">
                <span><img src="/img/Phone.svg"/></span>
                <span className="font-medium">11 99186 6413</span>
              </button>
              <button className="flex items-center space-x-3">
                <span><img src="/img/Support.svg"/></span>
                <span className="font-medium">ajuda@voysaude.com.br</span>
              </button>
              <button className="flex items-center space-x-3">
                <span><img src="/img/icon-question.svg"/></span>
                <div>
                  <p className="font-medium">Visite nossa central de ajuda</p>
                  <p className="text-sm opacity-75">Encontre respostas para suas perguntas</p>
                </div>
              </button>
            </div>
            <div className="flex flex-row md:flex-col gap-1 md:gap-0 w-full lg:hidden ">
              <Button variant="outline" className="bg-transparent hover:bg-white/80 border-2 py-6 w-full md:w-[160px]">WhatsApp</Button>
              <Button variant="outline" className="bg-transparent hover:bg-white/80 border-2 py-6 w-full md:w-[160px]">Email</Button>
              <Button variant="outline" className="bg-transparent hover:bg-white/80 border-2 py-6 w-full md:w-[160px]">Central de ajuda</Button>
            </div>
          </div>

          {/* Right Side - Legal Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">LEGAL</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                Política de privacidade
              </a>
              <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                Termos e condições
              </a>
              <a href="#" className="block hover:text-orange-300 transition-colors duration-200 text-lg font-medium">
                Seja um afiliado Voy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col justify-between space-y-4 md:space-y-0">
            <div className="flex justify-between space-x-4">
              <div className="text-white font-bold text-5xl py-2 rounded-lg">
                voy
              </div>
              <img src="/img/icon-instagram.svg" alt="Instagram" className="h-8" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-20">
              <div className="text-sm pt-6 font-normal">
                <p>A Voy não é uma farmácia. Todos produtos adquiridos são</p>
                <p>manipulados pelas farmácias credenciadas de acordo com as normas da Anvisa.</p>
                <p className="mt-4">Copyright 2025 Voy™. Todos os direitos reservados.</p>
              </div>
              <div className="pt-8">
                <img src="/img/payment-methods.svg" alt="Payment Methods"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
