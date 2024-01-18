'use client';

import { Toaster as Sonner } from 'sonner';

function Toaster({
  position = 'top-center',
  richColors = true,
  ...props
}: React.ComponentProps<typeof Sonner> = {}) {
  return <Sonner richColors={richColors} position={position} {...props} />;
}

export default Toaster;
