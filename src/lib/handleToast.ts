import { toast } from 'svelte-sonner'
import * as m from '$lib/paraglide/messages'
function handleErrorToast(status: number, error: string) {
  toast.error(error, {
    description: m.error_code() + status,
    action: {
      label: m.close(),
      onClick: () =>
        console.info(
          m.closed_error_message() +
            ': ' +
            error +
            ' ' +
            m.with_the_status() +
            ' ' +
            status,
        ),
    },
  })
}

function handleSuccessToast(message: string) {
  toast.success(message, {
    action: {
      label: m.close(),
      onClick: () => console.info(m.close_message() + ': ' + message),
    },
  })
}

export function handleToast(type: string, status: number, message: string) {
  if (type === 'error') {
    handleErrorToast(status, message)
  } else if (type === 'success') {
    handleSuccessToast(message)
  }
}
