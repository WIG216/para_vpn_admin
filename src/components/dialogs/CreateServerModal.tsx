import { Plus } from "lucide-react";
import { DialogLayout } from "../base/DialogLayout";
import { Button } from "../ui/button";
import ImageUploader from "../base/ImageUploader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../base/Input";
import { useCreateServer, useUpdateServer } from "@/servers/mutation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useModal } from "@/store/use-modal-store";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z.instanceof(File).optional(),
});

const CreateServerModal = () => {
  const createServerMutation = useCreateServer();
  const updateServerMutation = useUpdateServer();
  const { toast } = useToast();
  const { isOpen, onClose, type, data } = useModal();

  const isUpdate = type === "updateServer" && data;

  type FormSchemaType = z.infer<typeof FormSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    const { image, name } = values;

    if (!isUpdate && !image) {
      form.setError("image", { type: "manual", message: "Image is required" });
      return;
    }

    if (!isUpdate && image!.size >= 5 * 1024 * 1024) {
      console.log(!isUpdate && image!.size <= 5 * 1024 * 1024);
      form.setError("image", {
        type: "manual",
        message: "File size must be less than 5MB",
      });

      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", name);

    if (isUpdate) {
      await updateServerMutation.mutateAsync({ data: formData, id: data._id });
    } else {
      await createServerMutation.mutateAsync(formData);
    }
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (isUpdate) {
      form.setValue("name", data.name);
    }
  }, [isUpdate]);

  useEffect(() => {
    toast({
      title: "Server Created",
      description: "Your server has been create",
    });
  }, [createServerMutation.isSuccess]);

  useEffect(() => {
    toast({
      title: "Server Update",
      description: "Your server has been modified",
    });
  }, [updateServerMutation.isSuccess]);

  useEffect(() => {
    if (updateServerMutation.isError) {
      toast({
        title: "An error occurred",
        description: updateServerMutation.error.message,
      });
    }
  }, [updateServerMutation.isError]);

  useEffect(() => {
    if (createServerMutation.isError) {
      toast({
        title: "An error occurred",
        description: createServerMutation.error.message,
      });
    }
  }, [createServerMutation.isError]);

  return (
    <DialogLayout
      open={isOpen}
      setOpen={handleClose}
      title={isUpdate ? "Update Server" : "Add server"}
      description="Provide the information below"
      trigger={
        <Button
          leftIcon={<Plus className="w-5 h-5" />}
          className="py-3 px-4 hidden"
        >
          {isUpdate ? "Update Server" : "Add server"}
        </Button>
      }
      header={
        <div className="rounded-full p-3 w-fit bg-primary-50 mb-6">
          <Plus className="w-6 h-6 text-primary" />
        </div>
      }
      footer={
        <div className="w-4/5 flex justify-start md:justify-end space-x-4">
          <Button variant="outline" className="" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="w-7/12"
            onClick={form.handleSubmit(onSubmit)}
            loading={
              isUpdate
                ? updateServerMutation.isPending
                : createServerMutation.isPending
            }
          >
            {isUpdate ? "Update" : "Create"}
          </Button>
        </div>
      }
    >
      <div className="grid gap-2 py-2 w-full">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            {form.formState.errors.image && (
              <Alert variant="destructive" className="bg-red-50">
                <AlertTitle>Waring</AlertTitle>
                <AlertDescription>
                  {form.formState.errors.image.message}
                </AlertDescription>
              </Alert>
            )}

            <ImageUploader
              existingImage={isUpdate ? data.image : null}
              onImageChange={(image) => form.setValue("image", image)}
            />
            <Input
              name="name"
              control={form.control}
              label="Server name"
              placeholder="Ex. Netherland"
            />
          </form>
        </FormProvider>
      </div>
    </DialogLayout>
  );
};

export default CreateServerModal;
