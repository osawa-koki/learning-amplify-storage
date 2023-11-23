import React, { useEffect, useState } from 'react'
import { type ListPaginateInput, list } from 'aws-amplify/storage'
import { Table } from 'react-bootstrap'
import { IoReloadSharp } from 'react-icons/io5'

import { toast } from 'react-toastify'

import dayjs from 'dayjs'

export default function ListfilesComponent (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [files, setFiles] = useState<StorageItem[]>([])

  const load = async (): Promise<void> => {
    const listPaginateInput: ListPaginateInput = {
      prefix: '',
      options: {
        accessLevel: 'private'
      }
    }
    try {
      const listResult = await list(listPaginateInput)
      const items = listResult.items
      setFiles(items)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    load()
      .then(() => {
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed to load files.')
      })
  }, [])

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <IoReloadSharp onClick={async () => {
        setIsLoading(true)
        await load()
        setIsLoading(false)
      }} className={`${isLoading ? 'bg-secondary' : ''} border my-1`} role='button' />
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>size</th>
            <th>lastModified</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            return (
              <tr key={file.key}>
                <td>{file.key}</td>
                <td>{file.size}</td>
                <td>{file.lastModified != null ? dayjs(file.lastModified).format('YYYY-MM-DD HH:mm:ss') : 'undefined'}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
