/* eslint-disable @typescript-eslint/no-explicit-any */


import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useScreenSize from "@/hooks/useScreenSize";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  header: React.ReactNode;
  title?: string;
  description?: string;
  withCloseButton?: boolean;
  footer?: React.ReactNode;
  open: boolean;
  setOpen: any;
  size?: string
}

export function DialogLayout({
  children,
  trigger,
  title,
  description,
  header,
  footer,
  withCloseButton,
  open,
  setOpen,
  size
}: Props) {
  const { isMedium } = useScreenSize();

  if (isMedium) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={cn( size ? size: "sm:max-w-[425px]",)}>
          {title && (
            <DialogHeader>
              {header}
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
          )}
          {children}
          <DialogFooter>
            {withCloseButton && (
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            )}
            {footer}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return(
    <Drawer>
    <DrawerTrigger asChild>
    <DrawerTrigger asChild>{trigger}</DrawerTrigger>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
      {title && (
          <DrawerHeader className="text-left">
            {header}
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
        )}
        <div className="px-4">{children}</div>
        <DrawerFooter className="">
        {withCloseButton && (
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          )}
          {footer}
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
  )

//   return (
//     <Drawer open={open} >
//       <DrawerTrigger asChild>{trigger}</DrawerTrigger>
//       <DrawerContent>
        // {title && (
        //   <DrawerHeader className="text-left">
        //     {header}
        //     <DrawerTitle>{title}</DrawerTitle>
        //     <DrawerDescription>{description}</DrawerDescription>
        //   </DrawerHeader>
        // )}
//         <div className="px-4">{children}</div>
//         <DrawerFooter className="pt-2">
        //   {withCloseButton && (
        //     <DrawerClose asChild>
        //       <Button variant="outline">Cancel</Button>
        //     </DrawerClose>
        //   )}
        //   {footer}
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
}
