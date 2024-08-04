import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import Typography from './ui/typography';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { createChannel } from '@/actions/channels';

type Props = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
};

const CreateChannelDaialog = ({
  dialogOpen,
  setDialogOpen,
  workspaceId,
  userId,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Channel name must be at least 2 characters long' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      await createChannel({
        name,
        userId,
        workspaceId,
      });

      setIsSubmitting(false);
      setDialogOpen(false);
      form.reset();
      toast.success('Channel created successfully');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen((prevState) => !prevState)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography text="Create channel" variant="h3" />
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography text="Channel name" variant="p" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Channel name" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Typography
                      text="This is your channel name."
                      variant="p"
                      className="mb-4"
                    />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-3" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDaialog;
