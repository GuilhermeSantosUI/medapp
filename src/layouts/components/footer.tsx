import { Button } from '@/views/components/ui/button';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <div className="container flex items-center justify-between pb-6">
      <p className="text-xs">
        {new Date().getFullYear()} by{' '}
        <Link to="" target="_blank">
          Start Corp Tecnologia &copy;
        </Link>
      </p>

      <div className="flex items-center justify-center gap-4">
        <p className="text-xs">Termos e Condições</p>

        <Button size="sm" variant="outline">
          Suporte Técnico
        </Button>
      </div>
    </div>
  );
}
