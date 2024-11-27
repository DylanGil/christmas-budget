"use client";

import { deleteRecipient } from "@/app/actions";
import { Recipient } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DataTableColumnHeader } from "../data-table-column-header";
import { RecipientForm } from "../RecipientForm";

export const CreateColumns = (
  recipients: Recipient[],
  setRecipients: (recipients: Recipient[]) => void
): ColumnDef<Recipient>[] => {
  return [
    {
      id: "actions",
      cell: ({ row }) => {
        const recipient = row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Ouvrir le menu d&apos;actions</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => setIsEditSheetOpen(true)}
                >
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer ce destinataire ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                  </DialogClose>
                  <DialogClose
                    asChild
                    onClick={() => {
                      setRecipients(
                        recipients.filter((d) => d.id !== recipient.id)
                      );
                      deleteRecipient(recipient.id);
                      toast("Destinataire supprimé");
                    }}
                  >
                    <Button type="submit" variant="destructive">
                      Confirm
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Modifier</SheetTitle>
                </SheetHeader>
                <RecipientForm
                  recipients={recipients}
                  setRecipients={setRecipients}
                  recipient={recipient}
                  setIsEditSheetOpen={setIsEditSheetOpen}
                  editOrCreate="edit"
                />
              </SheetContent>
            </Sheet>
          </>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "gift",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cadeau" />
      ),
    },
    {
      accessorKey: "shop",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Magasin" />
      ),
    },
    {
      accessorKey: "link",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lien" />
      ),
    },
    {
      accessorKey: "budget",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Budget" />
      ),
    },
    {
      accessorKey: "actual_budget",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Budget actuel" />
      ),
    },
    {
      accessorKey: "difference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Différence" />
      ),
    },
    {
      accessorKey: "is_purchased",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Acheté" />
      ),
      cell: ({ row }) => (
        <div>{row.getValue("is_purchased") ? "Oui" : "Non"}</div>
      ),
    },
    {
      accessorKey: "is_wrapped",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Emballé" />
      ),
      cell: ({ row }) => (
        <div>{row.getValue("is_wrapped") ? "Oui" : "Non"}</div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Catégorie" />
      ),
    },
  ];
};

export const recipientsColumnHeaders = {
  name: "Nom",
  gift: "Cadeau",
  shop: "Magasin",
  link: "Lien",
  budget: "Budget",
  actual_budget: "Budget actuel",
  is_purchased: "Acheté",
  difference: "Différence",
  is_wrapped: "Emballé",
  category: "Catégorie",
};
