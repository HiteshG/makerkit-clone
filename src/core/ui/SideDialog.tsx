import { Dialog, DialogContent } from '@radix-ui/react-dialog';

function SideDialog(
  props: React.PropsWithChildren<{
    open: boolean;
    onOpenChange: (value: boolean) => void;
    modal?: boolean;
  }>,
) {
  return (
    <Dialog
      modal={props.modal}
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={
          'h-screen fixed right-0 w-full xl:w-[50%] bg-background' +
          ' border z-50 shadow-2xl rounded-l-lg' +
          ' top-0 outline-none animate-in fade-in zoom-in-90' +
          ' slide-in-from-right-64 p-6 duration-800 dark:shadow-primary/40'
        }
      >
        {props.children}
      </DialogContent>
    </Dialog>
  );
}

export default SideDialog;
