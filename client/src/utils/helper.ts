/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify'

export const errorNotify = (notify: any) => {
  toast.error(notify.message, {
    position: toast.POSITION.TOP_RIGHT,
    ...notify
  })
}

export const successNotify = (notify: any) => {
  toast.success(notify.message, {
    position: toast.POSITION.TOP_RIGHT,
    ...notify
  })
}

export const warnNotify = (notify: any) => {
  toast.warn(notify.message, {
    position: toast.POSITION.TOP_RIGHT,
    ...notify
  })
}

export const infoNotify = (notify: any) => {
  toast.info(notify.message, {
    position: toast.POSITION.TOP_RIGHT,
    ...notify
  })
}

export default {
  errorNotify,
  successNotify,
  warnNotify,
  infoNotify
}
