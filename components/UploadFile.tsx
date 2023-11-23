import React, { useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import { type UploadDataInput, uploadData } from 'aws-amplify/storage'

export default function UploadFileComponent (): React.JSX.Element {
  const [fileName, setFileName] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const buttonIsDisabled = useMemo(() => {
    return fileName == null || file == null
  }, [fileName, file])

  const uploadFile = (): void => {
    if (file == null) return
    if (fileName == null) return
    const uploadDataInput: UploadDataInput = {
      key: fileName,
      data: file,
      options: {
        accessLevel: 'private'
      }
    }
    uploadData(uploadDataInput)
  }

  return (
    <>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={fileName} onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = event
          if (target == null) return
          const value = target.value
          setFileName(value)
        }} />
      </Form.Group>
      <Form.Group controlId="formBasicFile">
        <Form.Label>File</Form.Label>
        <Form.Control type="file" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { target: { files } } = event
          if (files == null) return
          const file = files[0]
          setFile(file)
          setFileName(file.name)
        }} />
      </Form.Group>
      <Button variant="primary" onClick={uploadFile} className='mt-3' disabled={buttonIsDisabled}>Upload</Button>
    </>
  )
}
