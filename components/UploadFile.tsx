import React, { useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import { toast } from 'react-toastify'

import { type UploadDataInput, uploadData } from 'aws-amplify/storage'

export default function UploadFileComponent (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [fileName, setFileName] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const buttonIsDisabled = useMemo(() => {
    return fileName == null || file == null
  }, [fileName, file])

  const uploadFile = async (): Promise<void> => {
    if (file == null) return
    if (fileName == null) return
    const uploadDataInput: UploadDataInput = {
      key: fileName,
      data: file,
      options: {
        accessLevel: 'private'
      }
    }
    try {
      setIsLoading(true)
      const uploadDataOutput = uploadData(uploadDataInput)
      await uploadDataOutput.result
      toast.success('Upload success.')
    } catch (error) {
      toast.error('Upload failed.')
    } finally {
      setIsLoading(false)
    }
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
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button variant="primary" onClick={uploadFile} className='mt-3' disabled={buttonIsDisabled || isLoading}>Upload</Button>
    </>
  )
}
