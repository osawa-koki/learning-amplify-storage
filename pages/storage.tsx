import React from 'react'
import UploadFileComponent from '../components/UploadFile'
import ListfilesComponent from '../components/Listfiles'

export default function StoragePage (): React.JSX.Element {
  return (
    <>
      <UploadFileComponent />
      <hr className='my-5' />
      <ListfilesComponent />
    </>
  )
}
