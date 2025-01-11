import { phoneMask } from '@/app/utils';
import { Badge } from '@/views/components/ui/badge';
import { Button } from '@/views/components/ui/button';
import { Check, Copy } from '@phosphor-icons/react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ASO
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [copiedId, setCopiedId] = useState<string | null>(null);

      async function handleCopyToClipBoard(id: string) {
        try {
          await navigator.clipboard.writeText(id);
          toast.success(`ASO ${id} copiado!`);
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error('Falha ao copiar o ID. Tente novamente.');
        }
      }

      return (
        <div className="group flex items-center gap-2 font-medium">
          {row.getValue('id')}
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => handleCopyToClipBoard(row.getValue('id'))}>
            {copiedId === row.getValue('id') ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="sr-only">
              {copiedId === row.getValue('id') ? 'Copiado!' : 'Copiar ID'}
            </span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nome
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="px-3">{row.original.patient.name}</div>;
    },
  },
  {
    accessorKey: 'telefone',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Telefone
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="px-3">{phoneMask(row.original.patient.phone1)}</div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="px-3">{row.original.patient.email}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <Badge
          className="text-xs"
          variant={
            status === 'Aprovado'
              ? 'secondary'
              : status === 'Pendente'
              ? 'outline'
              : 'default'
          }>
          {status === 1 ? 'Aprovado' : status === 0 ? 'Pendente' : 'Reprovado'}
        </Badge>
      );
    },
  },
];
