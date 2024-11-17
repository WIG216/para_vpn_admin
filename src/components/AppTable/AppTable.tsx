/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DataTable } from "../DataTable";
import { useServers } from "@/servers/queries";
import { Pencil, Plus, Trash } from "lucide-react";
import confirmDialog, {
  closeConfirmDialog,
  toggleDialogLoading,
} from "../dialogs/ConfirmDialog";
import { useDeleteServer } from "@/servers/mutation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/store/use-modal-store";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export default function AppTable() {
  const { data: servers, isPending, isError, error } = useServers();
  const deleteServerMutation = useDeleteServer();
  const { toast } = useToast();
  const { onOpen } = useModal();

  const columns: ColumnDef<Server>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row: { original } }) => (
        <img src={original.image} className="size-12 rounded object-cover" />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row: { original } }) => (
        <div className="capitalize">{format(original.createdAt, "PPP")}</div>
      ),
    },
  ];

  const handleDelete = (data: Server) => {
    confirmDialog<Server>({
      title: "Delete",
      desc: "Are you sure you want to delete this server?",
      onOk: async () => {
        await deleteServerMutation.mutateAsync(data._id);
        closeConfirmDialog();
      },
    });
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (deleteServerMutation.isError) {
      toast({
        title: "An error occurred",
        description: deleteServerMutation.error.message,
      });
    }
  }, [deleteServerMutation.isError]);

  useEffect(() => {
    if (deleteServerMutation.isSuccess) {
      toast({
        title: "Server Delete",
        description:
          "All the information related to this server has been deleted",
      });
    }
  }, [deleteServerMutation.isSuccess]);

  useEffect(() => {
    toggleDialogLoading();
  }, [deleteServerMutation.isPending]);

  return (
    <Card className="mt-12  flex flex-col shadow-none  poppins border-none ">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle className="font-bold text-[23px] ">Servers</CardTitle>
            <p className="text-sm text-slate-600">{servers?.length} servers</p>
          </div>
          <Button
            leftIcon={<Plus className="w-5 h-5" />}
            className="py-3 px-4"
            onClick={() => onOpen({ type: "createServer" })}
          >
            Add Server
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={servers || []}
          enableColumnVisibility
          enableRowSelection
          loading={isPending}
          actions={[
            {
              title: "Delete",
              buttonProps: { variant: "action-danger" },
              icon: Trash,
              onSelect: handleDelete,
            },
            {
              title: "Update",
              buttonProps: { variant: "action-warning" },
              icon: Pencil,
              onSelect: (server) => {
                onOpen({ type: "updateServer", data: server });
              },
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
