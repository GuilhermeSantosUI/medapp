import { Button } from '@/views/components/ui/button';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <div className="flex items-center justify-between">
      <p className='text-xs'>
        {new Date().getFullYear()} by{' '}
        <Link to="" target="_blank">
          Start Corp Tecnologia &copy;
        </Link>
      </p>

      <div className="flex items-center justify-center gap-2">
        <p >Termos e Condições</p>

        <Button size="sm">Suporte Técnico</Button>
      </div>
    </div>
  );
}
