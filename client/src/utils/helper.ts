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

export const youtubeParserId = (url: string) => {
  let video_id = url.split('v=')[1]
  const ampersandPosition = video_id.indexOf('&')
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition)
  }
  return video_id
}

export default {
  errorNotify,
  successNotify,
  warnNotify,
  infoNotify
}
