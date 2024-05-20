'use client';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter } from '../../ui/view/molecule/sheet/sheet';

type SideNavigationBarProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
};

export default function SideNavigationBar({ header, content, footer }: SideNavigationBarProps) {
  return (
    <Sheet>
      <SheetTrigger className="h-6">
        <HamburgerMenuIcon className="w-6 h-6 text-white" />
      </SheetTrigger>
      <SheetContent className="z-3">
        <div className="flex h-full flex-col justify-between">
          <SheetHeader>{header}</SheetHeader>
          <div className="w-full h-1 rounded-full my-4 bg-gray-200" />
          <div className="h-full">{content}</div>
          <SheetFooter>{footer}</SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
