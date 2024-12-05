import { Badge } from '@/views/components/ui/badge';
import { Button } from '@/views/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/views/components/ui/table';
import { Copy } from '@phosphor-icons/react';

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
  {
    id: '234567',
    nome: 'Lucas Lima',
    telefone: '(61) 94567-8901',
    email: 'lucas@example.com',
    status: 'Reprovado',
  },
  {
    id: '890123',
    nome: 'Mariana Souza',
    telefone: '(71) 95678-9012',
    email: 'mariana@example.com',
    status: 'Aprovado',
  },
  {
    id: '456789',
    nome: 'Rafael Alves',
    telefone: '(81) 96789-0123',
    email: 'rafael@example.com',
    status: 'Pendente',
  },
  {
    id: '678901',
    nome: 'Fernanda Rocha',
    telefone: '(91) 97890-1234',
    email: 'fernanda@example.com',
    status: 'Reprovado',
  },
  {
    id: '012345',
    nome: 'Gustavo Martins',
    telefone: '(31) 98901-2345',
    email: 'gustavo@example.com',
    status: 'Aprovado',
  },
];

export function AsoTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ASO</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="hidden sm:table-cell">Telefone</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="group flex items-center gap-2 font-medium">
                {item.id}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copiar ID</span>
                </Button>
              </span>
            </TableCell>

            <TableCell>
              <div className="font-medium">{item.nome}</div>
            </TableCell>

            <TableCell className="hidden sm:table-cell">
              {item.telefone}
            </TableCell>

            <TableCell className="hidden sm:table-cell">{item.email}</TableCell>

            <TableCell className="hidden md:table-cell">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
