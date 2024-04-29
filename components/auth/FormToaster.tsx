"use client"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function FormToaster(message: string) {
  const { toast } = useToast()
  return toast({
    variant: "destructive",
    title: message,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  })
}


// import { toast } from "sonner"

// export default function FormSonner(message: string) {
//   return (
//     toast.success(message, {
//       action: {
//         label: "Undo",
//         onClick: () => { },
//       },
//     })
//   )
// }