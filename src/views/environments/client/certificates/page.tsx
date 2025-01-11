import { Manage } from './manage';
import { clientService } from '@/app/services/client';
import { Badge } from '@/views/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/views/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { endOfDay } from 'date-fns';

// Dados para popular a tabela
const data = [
  {
    id: '123456',
    nome: 'João Silva',
    telefone: '(11) 98765-4321',
    email: 'joao@example.com',
    status: 'Aprovado',
  },
  {
    id: '789012',
    nome: 'Maria Oliveira',
    telefone: '(21) 99876-5432',
    email: 'maria@example.com',
    status: 'Pendente',
  },
  {
    id: '345678',
    nome: 'Carlos Pereira',
    telefone: '(31) 91234-5678',
    email: 'carlos@example.com',
    status: 'Reprovado',
  },
  {
    id: '901234',
    nome: 'Ana Costa',
    telefone: '(41) 92345-6789',
    email: 'ana@example.com',
    status: 'Aprovado',
  },
  {
    id: '567890',
    nome: 'Pedro Santos',
    telefone: '(51) 93456-7890',
    email: 'pedro@example.com',
    status: 'Pendente',
  },
];

export function Certificates() {
  const { data: getAllExams } = useQuery({
    queryKey: ['getAllExams'],
    queryFn: clientService.getAllExams,
  });

  console.log(getAllExams);

  return (
    <div>
      <div className="animate-slidein200 opacity-0 flex items-end justify-start gap-2 py-8 px-4 pb-6 border-b">
        <h1 className="text-3xl">Atestados</h1>
        <p className="text-sm text-zinc-400">
          {String(endOfDay(new Date()).getDate()).padStart(2, '0')}
        </p>
      </div>

      <hr className="border-b-[10px] border-[#f5f5f5]" />

      <div className="animate-slidein600 opacity-0 px-4 py-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ASO</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.telefone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Badge
                    className="text-xs"
                    variant={
                      item.status === 'Aprovado'
                        ? 'secondary'
                        : item.status === 'Pendente'
                        ? 'outline'
                        : 'default'
                    }>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Manage />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
