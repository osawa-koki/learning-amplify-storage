import React, { useEffect, useState } from 'react'
import { type ListPaginateInput, list } from 'aws-amplify/storage'
import { Table } from 'react-bootstrap'
import dayjs from 'dayjs'

export default function ListfilesComponent (): React.JSX.Element {
  const [files, setFiles] = useState<StorageItem[]>([])

  const load = (): void => {
    const listPaginateInput: ListPaginateInput = {
      prefix: '',
      options: {
        accessLevel: 'private'
      }
    }
    list(listPaginateInput)
      .then((listResult) => {
        const items = listResult.items
        setFiles(items)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
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
