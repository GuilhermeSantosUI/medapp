import { Button } from '@/views/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/views/components/ui/dropdown-menu';
import { ArrowRight, Lightning, Users } from '@phosphor-icons/react';
import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <div className="sticky top-0 backdrop-blur-md bg-white/30 z-[99999999]">
      <header className="p-4 flex items-center border-b justify-between gap-2">
        <div className="flex items-center gap-4">
          <img src="/grupo-ssma.png" className="w-32 mr-2" />

          <div className="flex items-center gap-4">
            <div className="w-fit h-fit flex items-center gap-2">
              <Button
                asChild
                variant="secondary"
                className="rounded-xl flex items-center justify-center gap-2">
                <NavLink to="/management">
                  <p className="leading-3">Início</p>
                </NavLink>
              </Button>
              <Button asChild variant="ghost" className="rounded-xl">
                <NavLink to="/consumer">
                  <Users size={20} />
                </NavLink>
              </Button>
              <Button asChild variant="ghost" className="rounded-xl">
                <NavLink to="/newsroom">
                  <Lightning size={20} />
                </NavLink>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="secondary"
            className="rounded-xl flex items-center gap-1">
            <Link to="/certificate">
              Solicitar atestado
              <ArrowRight className="w-4" />
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative !p-0">
                  <img
                    src="https://avatars.githubusercontent.com/u/69989490?v=4"
                    alt=""
                    className="h-10 w-10 rounded-xl border-2"
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-48 z-[999999999]"
                align="end"
                forceMount>
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="https://wa.me/5579981291760?text=Ol%C3%A1%2C+Preciso+de+ajuda+com%3A+"
                    target="_blank">
                    Suporte Técnico
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Sair
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}