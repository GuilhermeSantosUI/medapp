import { Button } from '@/views/components/ui/button';
import { Newspaper } from '@phosphor-icons/react';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Calendar } from './components/calendar';

export function DateStep() {
  const navigate = useNavigate();
  return (
    <>
      <hr className="border-b-[10px] border-[#f5f5f5]" />

      <div className="container max-w-[1024px] flex-auto flex flex-col py-6">
        <div className="flex items-center gap-2">
          <Button className="rounded-xl flex items-center justify-center gap-2">
            <p className="font-normal">1/8</p>
          </Button>

          <Button
            variant="outline"
            className="rounded-xl flex items-center justify-center gap-2">
            <p className="font-normal">Contrato</p>
            <Newspaper size={20} />
          </Button>
        </div>

        <div className="flex gap-8 flex-auto mt-4">
          <div className="w-full ">
            <h1 className="text-2xl mb-2 font-medium">Horários disponiveis</h1>

            <p className="font-light text-slate-400">
              Hoje | Dia 02 | Segunda-Feira
            </p>

            <h2 className="text-lg py-2 border-b">Manha</h2>

            <h2 className="text-lg py-2 border-b">Tarde</h2>
          </div>

          <form action="" className="w-full max-w-[400px] flex flex-col gap-6">
            <Calendar />

            <h1>
              Colocar lista de horarios disponiveis para a data selecionada
            </h1>

            <div className="flex gap-2 mt-auto">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="ghost"
                className="w-fit rounded-xl flex items-center justify-between gap-1 ml-auto">
                Voltar
              </Button>

              <Button
                asChild
                className="w-fit rounded-xl flex items-center justify-between gap-1">
                <Link to="/certificate/employee">
                  Continuar
                  <ArrowUpRight className="w-4" />
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
