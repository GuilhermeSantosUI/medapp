import { Button } from '@/views/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function ExamStep() {
  const navigate = useNavigate();
  return (
    <>
      <hr className="border-b-[10px] border-[#f5f5f5]" />

      <div className="container max-w-[1024px] flex-auto flex flex-col py-6">
        <div className="flex gap-8 flex-auto mt-4">
          <div className="w-full"></div>

          <form action="" className="w-full max-w-[400px] flex flex-col gap-6">
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
