import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { UserModel } from "@/mocks/mock-users";

interface UsersTableProps {
  data: UserModel[];
}

export function UsersTable({ data }: UsersTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[96px] text-center">Ações</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              className="transition-colors hover:bg-muted/40"
            >
              {/* Ações */}
              <TableCell className="text-center">
                <div className="inline-flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
                    aria-label="Editar usuário"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    aria-label="Excluir usuário"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>

              {/* Dados */}
              <TableCell className="font-medium">{user.username}</TableCell>

              <TableCell>{user.name}</TableCell>

              <TableCell className="text-muted-foreground">
                {user.email}
              </TableCell>

              <TableCell>{user.phone}</TableCell>

              <TableCell>{user.department}</TableCell>

              <TableCell>{user.role}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    user.accountType === "admin" ? "default" : "secondary"
                  }
                >
                  {user.accountType === "admin" ? "Administrador" : "Comum"}
                </Badge>
              </TableCell>

              <TableCell className="text-sm text-muted-foreground">
                {user.createdAt}
              </TableCell>

              <TableCell className="text-sm text-muted-foreground">
                {user.updatedAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
